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
	parent: "#context",
	trickleSpeed: 200,
	minimum: 0.1,
})

router.beforeEach((to, from, next) => {
	to.meta.activeLink = {
		name: from.name?.toString() ?? "",
		link: from.path ?? "/",
	}

	next()
})

createApp(App).use(router).mount("#app")
