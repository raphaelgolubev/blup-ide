import { BrowserWindow, Screen, ApplicationMenu, type Rectangle, Updater, BrowserView } from "electrobun/bun";
import { appMenu } from "./appMenu";
import { type WindowSize } from "./interfaces";
import { type MyWebviewRPCType } from "../rpc/schema";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// Check if Vite dev server is running for HMR
async function getMainViewUrl(): Promise<string> {
	const channel = await Updater.localInfo.channel();
	if (channel === "dev") {
		try {
			await fetch(DEV_SERVER_URL, { method: "HEAD" });
			console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
			return DEV_SERVER_URL;
		} catch {
			console.log(
				"Vite dev server not running. Run 'bun run dev:hmr' for HMR support.",
			);
		}
	}
	return "views://main_ui/index.html";
}

function getWindowPosition(size: WindowSize): Rectangle {
	const screen = Screen.getPrimaryDisplay().bounds;

	return {
		width: size.width,
		height: size.height,
		x: (screen.width / 2) - (size.width / 2),
		y: (screen.height / 2) - (size.height / 2)
	}
}

// calculating window size and position
const customFrame: Rectangle = getWindowPosition({ width: 1200, height: 800 });
const tempFrame: Rectangle = {
	width: 940,
	height: 1170,
	x: 10,
	y: 0
};

// url
const url = await getMainViewUrl();

// Create an RPC object for the bun handlers with the shared type
const myWebviewRPC = BrowserView.defineRPC<MyWebviewRPCType>({
	maxRequestTime: 5000,
	handlers: {
		requests: {
			someBunFunction: ({ a, b }) => {
				console.log(`browser asked me to do math with: ${a} and ${b}`);
				return a + b;
			},
		},
		// When the browser sends a message we can handle it
		// in the main bun process
		messages: {
			"*": (messageName, payload) => {
				console.log("global message handler", messageName, payload);
			},
			logToBun: ({ msg }) => {
				console.log("Log to bun: ", msg);
			},
			// Фронтенд говорит: "Я готов, дай мне данные!"
            frontendReady: async () => {
                console.log("Фронтенд проснулся! Отправляем запрос из Bun...");
                try {
                    // Теперь это безопасно, так как фронтенд точно слушает
                    const answer = await mainWindow.webview.rpc?.request.someWebviewFunction({ a: 10, b: 10 });
                    console.log(`Ответ от фронтенда: ${answer}`);
                } catch (e) {
                    console.error("Ошибка при запросе к готовому фронтенду:", e);
                }
            }
		},
	},
});

// Create the main application window
const mainWindow = new BrowserWindow({
	title: "Hello Electrobun!",
	url: url,
	frame: {
		width: tempFrame.width,
		height: tempFrame.height,
		x: tempFrame.x,
		y: tempFrame.y,
	},
	titleBarStyle: "hidden",
	rpc: myWebviewRPC
});

// set application menu
ApplicationMenu.setApplicationMenu(appMenu);

mainWindow.webview.on("dom-ready", async () => {
	console.log("Окно готово, вызываем функцию во фронтенде...");
	try {
		const answer = await mainWindow.webview.rpc?.request.someWebviewFunction({ a: 10, b: 10 });
		console.log(`answer: ${answer}`);
	} catch (error) {
		console.log(`Ой, фронтенд еще не готов или ошибка: ${error}`);
	}
});
