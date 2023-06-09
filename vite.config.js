import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			srcDir: "src",
			filename: "firebase-messaging-sw.js",
			strategies: "injectManifest",
			injectRegister: false,
			manifest: false,
			injectManifest: {
			  injectionPoint: null,
			},
		})
	]
});
