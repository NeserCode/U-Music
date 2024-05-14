import { useStorage } from "@vueuse/core"
import { watch, type Ref } from "vue"

export function useAppRounded(element: Ref<HTMLDivElement | undefined>) {
	const isRounded = useStorage("app-rounded", false)
	const listeningRounded = (e = element) =>
		watch(isRounded, (flag) => {
			if (flag) e.value?.classList.add("rounded-style")
			else e.value?.classList.remove("rounded-style")
		})

	return {
		isRounded,
		listeningRounded,
	}
}
