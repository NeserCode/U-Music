import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"
import { nextTick } from "vue"
import { useDebounceFn, useStorage } from "@vueuse/core"
import { $bus } from "./useMitt"

import type { BoundingContainerType, LocalBoundings } from "@shared"
const appWindow = getCurrentWebviewWindow()

const setTopDebounce = useDebounceFn(async (flag: boolean) => {
	await appWindow.setAlwaysOnTop(flag)
}, 200)

const defaultBounding = {
	width: 0,
	height: 0,
}
const localBoundings = useStorage<LocalBoundings>("boundings", {
	home: defaultBounding,
	setting: defaultBounding,
	list: defaultBounding,
})
export class BoundingObserver {
	$RO: ResizeObserver | null = null

	constructor(type: BoundingContainerType) {
		if (!document) return

		this.$RO = new ResizeObserver((entries: ResizeObserverEntry[]) => {
			const { width, height } = localBoundings.value[type]
			const { blockSize, inlineSize } = entries[0].borderBoxSize[0]

			if (width < inlineSize || height < blockSize) {
				localBoundings.value[type] = {
					width: inlineSize,
					height: blockSize,
				}
			}
		})
	}

	observe() {
		$bus.on("scrollbar-init", () => {
			const simplebarContent = document.querySelector(".simplebar-content")!
			nextTick(() => {
				;(this.$RO as ResizeObserver).observe(simplebarContent)
			})
		})
	}
	unobserve() {
		const simplebarContent = document.querySelector(".simplebar-content")!
		;(this.$RO as ResizeObserver).unobserve(simplebarContent)
	}
	disconnect() {
		$bus.off("scrollbar-init")
		;(this.$RO as ResizeObserver).disconnect()
	}
}

export const useWindow = () => {
	return {
		$window: appWindow,
		appAlwaysOnTop: useStorage<boolean>(
			"app-always-on-top",
			false,
			localStorage,
			{
				serializer: {
					read: (value) => JSON.parse(value),
					write: (value) => {
						setTopDebounce(value)
						return JSON.stringify(value)
					},
				},
			}
		),
		nextTickToShow: () => {
			setTimeout(async () => {
				await appWindow.show()
			}, 0)
		},
		nextTickToHide: () => {
			setTimeout(async () => {
				await appWindow.hide()
			}, 0)
		},
	}
}
