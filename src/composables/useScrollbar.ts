import { useStorage } from "@vueuse/core"

const isScrollbarAutoHide = useStorage("scrollbar-auto-hide", false)

export const useScrollbar = () => ({
	isScrollbarAutoHide,
})
