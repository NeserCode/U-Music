<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core"
import SimpleBar from "simplebar"
import { nextTick, ref, watch } from "vue"
import { useRoute } from "vue-router"
import { useScrollbar } from "@composables/useScrollbar"

const scrollbarRef = ref<SimpleBar | null>(null)
const { isScrollbarAutoHide } = useScrollbar()

const initSimpleBar = useThrottleFn(() => {
	setTimeout(() => {
		nextTick(() => {
			if (!document) throw Error("Scrollable cannot reach the document.")
			let ctx = document.querySelector("#context") as HTMLDivElement
			if (ctx)
				scrollbarRef.value = new SimpleBar(ctx, {
					autoHide: isScrollbarAutoHide.value,
					clickOnTrack: true,
					scrollbarMaxSize: 240,
				})
			else throw Error("Scrollable cannot reach the content, view not found.")

			scrollbarRef.value.init()
			console.log(isScrollbarAutoHide.value)
		})
	}, 500)
}, 300)

const $route = useRoute()
watch(
	() => $route.fullPath,
	() => {
		initSimpleBar()
	},
	{ immediate: true }
)
watch(isScrollbarAutoHide, () => {
	initSimpleBar()
})
</script>

<template>
	<div class="view-scrollable">
		<slot></slot>
	</div>
</template>

<style lang="postcss">
.simplebar-track.simplebar-vertical {
	@apply w-4;
}
.simplebar-scrollbar:before {
	@apply w-3
	rounded-sm bg-slate-300 dark:bg-slate-400
	transition-all ease-in-out duration-300 delay-1000;
}
.simplebar-track.simplebar-hover .simplebar-scrollbar:before,
.simplebar-scrollbar.simplebar-dragging:before {
	@apply bg-slate-400 dark:bg-slate-300
	transition-colors ease-in-out duration-300;
}
</style>
