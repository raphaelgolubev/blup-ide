import { BrowserWindow, Screen, ApplicationMenu, type Rectangle, Updater } from "electrobun/bun";
import { appMenu } from "./appMenu";
import { type WindowSize } from "./interfaces";

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
	return "views://mainview/index.html";
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

// url
const url = await getMainViewUrl();

// Create the main application window
const mainWindow = new BrowserWindow({
	title: "Hello Electrobun!",
	url: url,
	frame: {
		width: customFrame.width,
		height: customFrame.height,
		x: customFrame.x,
		y: customFrame.y,
	},
  titleBarStyle: "hiddenInset"
});

// set application menu
ApplicationMenu.setApplicationMenu(appMenu);