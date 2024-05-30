import { createRouter, createWebHashHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		meta: {
			hideTopLinks: false,
		},
		component: () => import("./views/Home.vue"),
	},
	{
		path: "/setting",
		name: "Setting",
		meta: {
			hideTopLinks: false,
		},
		component: () => import("./views/Setting.vue"),
	},
	{
		path: "/list/:hash",
		name: "List",
		meta: {
			hideTopLinks: false,
		},
		component: () => import("./views/List.vue"),
	},
	{
		path: "/artist/:id",
		name: "Artist",
		meta: {
			hideTopLinks: false,
		},
		component: () => import("./views/Artist.vue"),
	},
	{
		path: "/album/:id",
		name: "Album",
		meta: {
			hideTopLinks: false,
		},
		component: () => import("./views/Album.vue"),
	},
	{
		path: "/song",
		name: "Song",
		meta: {
			hideTopLinks: true,
		},
		component: () => import("./views/Song.vue"),
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
