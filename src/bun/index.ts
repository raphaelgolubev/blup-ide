import { BrowserWindow, ApplicationMenu, Screen, type Rectangle } from "electrobun/bun";

interface WindowSize {
    width: number,
    height: number
}

ApplicationMenu.setApplicationMenu([
  {
    submenu: [{ label: "Quit", role: "quit" }],
  },
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      {
        label: "Custom Menu Item  🚀",
        action: "custom-action-1",
        tooltip: "I'm a tooltip",
      },
      {
        label: "Custom menu disabled",
        enabled: false,
        action: "custom-action-2",
      },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "pasteAndMatchStyle" },
      { role: "delete" },
      { role: "selectAll" },
    ],
  },
]);

function getWindowPosition(size: WindowSize): Rectangle {
    const screen = Screen.getPrimaryDisplay().bounds;

    return {
        width: size.width,
        height: size.height,
        x: (screen.width / 2) - (size.width / 2),
        y: (screen.height / 2) - (size.height / 2)
    }
}

const customFrame: Rectangle = getWindowPosition({ width: 1200, height: 800 });

// Create the main application window
const mainWindow = new BrowserWindow({
	title: "Hello Electrobun!",
	url: "views://mainview/index.html",
	frame: {
		width: customFrame.width,
		height: customFrame.height,
		x: customFrame.x,
		y: customFrame.y,
	},
});

console.log("Hello Electrobun app started!");
