import type { ElectrobunConfig } from "electrobun";

export default {
	app: {
		name: "blup-ide",
		identifier: "com.raphaelgolubev.blup",
		version: "0.0.1",
	},
	build: {
		bun: {
			entrypoint: "src/bun/index.ts",
			external: []
		},
		// views: {
		// 	main_ui: {
		// 		entrypoint: "src/main_ui/index.ts",
		// 	},
		// },
		copy: {
			"dist/index.html": "views/main_ui/index.html",
			"dist/assets": "views/main_ui/assets",
		},
		mac: {
			bundleCEF: false,
		},
		linux: {
			bundleCEF: false,
		},
		win: {
			bundleCEF: false,
		},
		watch: [],
		watchIgnore: []
	},
	runtime: {
		exitOnLastWindowClosed: false
	}
} satisfies ElectrobunConfig;