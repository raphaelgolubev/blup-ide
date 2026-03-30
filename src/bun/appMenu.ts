import { type ApplicationMenuItemConfig } from "electrobun";

export const appMenu: ApplicationMenuItemConfig[] = [
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
];