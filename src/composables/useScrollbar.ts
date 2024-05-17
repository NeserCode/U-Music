import { useStorage } from "@vueuse/core"

const isScrollbarAutoHide = useStorage("scrollbar-auto-hide", true)

export const useScrollbar = () => ({
	isScrollbarAutoHide,
})
