import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		meta: {},
		component: () => import("./views/Home.vue"),
	},
	{
		path: "/setting",
		name: "Setting",
		meta: {},
		component: () => import("./views/Setting.vue"),
	},
	{
		path: "/list/:hash",
		name: "List",
		meta: {},
		component: () => import("./views/List.vue"),
	},
	{
		path: "/artist/:id",
		name: "Artist",
		meta: {},
		component: () => import("./views/Artist.vue"),
	},
	{
		path: "/album/:id",
		name: "Album",
		meta: {},
		component: () => import("./views/Album.vue"),
	},
	{
		path: "/song",
		name: "Song",
		meta: {},
		component: () => import("./views/Song.vue"),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
