import { createApp } from "vue"
import "@/styles.css"

import App from "@/App.vue"
import router from "@/router"

import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({
	easing: "ease-in-out",
	speed: 100,
	showSpinner: false,
	parent: ".request-snap",
	trickleSpeed: 200,
	minimum: 0.1,
})

createApp(App).use(router).mount("#app")
