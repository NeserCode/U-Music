<script lang="ts" setup>
import { useIntervalFn } from "@vueuse/core"
import SimpleBar from "simplebar"
import "simplebar/dist/simplebar.css"
import { nextTick, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useScrollbar } from "@composables/useScrollbar"
import { useWindow } from "@composables/useWindow"
import { $bus } from "@/composables/useMitt"

const scrollbarRef = ref<SimpleBar | null>(null)
const { isScrollbarAutoHide } = useScrollbar()

const $props = withDefaults(
	defineProps<{
		el?: string
	}>(),
	{
		el: "#context",
	}
)

const { nextTickToShow } = useWindow()
const initSimpleBar = useIntervalFn(() => {
	nextTick(() => {
		if (!document) throw Error("Scrollable cannot reach the document.")
		let ctx = document.querySelector($props.el) as HTMLDivElement
		if (ctx)
			scrollbarRef.value = new SimpleBar(ctx, {
				autoHide: isScrollbarAutoHide.value,
				clickOnTrack: false,
				scrollbarMaxSize: 240,
			})
		else throw Error("Scrollable cannot reach the content, view not found.")

		if (scrollbarRef.value.el) scrollbarRef.value.recalculate()
		else scrollbarRef.value.init()

		initSimpleBar.pause()

		$bus.emit("scrollbar-init")
		nextTickToShow()
	})
}, 500)

const $route = useRoute()
watch(
	() => $route.fullPath,
	() => {
		initSimpleBar.resume()
	},
	{ immediate: true }
)
watch(isScrollbarAutoHide, () => {
	initSimpleBar.resume()
})
$bus.on("dynamic-content-init", () => {
	nextTick(() => {
		initSimpleBar.resume()
	})
})
</script>

<template>
	<div class="view-scrollable">
		<slot></slot>
	</div>
</template>

<style lang="postcss">
.simplebar-track.simplebar-vertical {
	@apply w-4 mr-1;
}
.simplebar-scrollbar:before {
	@apply w-3
	rounded bg-slate-300 dark:bg-slate-400
	transition-all ease-in-out duration-300 delay-1000;
}
.simplebar-track.simplebar-hover .simplebar-scrollbar:before,
.simplebar-scrollbar.simplebar-dragging:before {
	@apply bg-slate-400 dark:bg-slate-300
	transition-colors ease-in-out duration-300;
}
</style>
