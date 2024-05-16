import { createApp } from "vue"
import "@/styles.css"
import "simplebar/dist/simplebar.css"
import App from "@/App.vue"
import router from "@/router"

createApp(App).use(router).mount("#app")
