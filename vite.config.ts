import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [vue()],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 8888,
		strictPort: true,
		watch: {
			// 3. tell vite to ignore watching `src-tauri`
			ignored: ["**/src-tauri/**"],
		},
	},

	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
			"@assets": resolve(__dirname, "src/assets"),
			"@components": resolve(__dirname, "src/components"),
			"@composables": resolve(__dirname, "src/composables"),
			"@frameworks": resolve(__dirname, "src/frameworks"),
			"@presets": resolve(__dirname, "src/presets"),
			"@shared": resolve(__dirname, "src/shared"),
		},
	},
}))
