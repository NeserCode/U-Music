<script lang="ts" setup>
import { useDarkMode } from "@composables/useDarkMode"
import { ref } from "vue"
import { appWindow } from "@tauri-apps/api/window"

import {
	MinusIcon,
	XMarkIcon,
	SunIcon,
	MoonIcon,
} from "@heroicons/vue/24/solid"

const { isDarkMode, toggleDarkMode } = useDarkMode()
const operations = ref<HTMLDivElement | null>()

function addMoveClass(event: MouseEvent) {
	let element = event.target as HTMLElement
	element.classList.add("moving")
}
function removeMoveClass(event: MouseEvent) {
	let element = event.target as HTMLElement
	element.classList.remove("moving")
}

function minimize() {
	if (!operations.value) return
	let element = operations.value.querySelector(".minimize") as HTMLElement
	element.classList.remove("moving")
	appWindow.minimize()
}

async function close() {
	await appWindow.close()
}
</script>

<template>
	<div class="app-title-bar" data-tauri-drag-region>
		<span class="title" data-tauri-drag-region>
			<span data-tauri-drag-region> U Music </span>
		</span>
		<div class="title-bar-operations" data-tauri-drag-region ref="operations">
			<span
				class="operation darkmode"
				@mouseenter="addMoveClass"
				@mouseleave="removeMoveClass"
				@click="toggleDarkMode()"
			>
				<SunIcon v-show="!isDarkMode" class="icon" />
				<MoonIcon v-show="isDarkMode" class="icon" />
			</span>
			<span
				class="operation minimize"
				@mouseenter="addMoveClass"
				@mouseleave="removeMoveClass"
				@click="minimize"
			>
				<MinusIcon class="icon" />
			</span>
			<span
				class="operation close danger"
				@mouseenter="addMoveClass"
				@mouseleave="removeMoveClass"
				@click="close"
			>
				<XMarkIcon class="icon" />
			</span>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.app-title-bar {
	@apply relative inline-flex items-center justify-end w-full h-8
	border-b border-slate-300 dark:border-slate-600
	bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200
	transition-all ease-in-out duration-300
  select-none;

	z-index: 99999999;
}

.title {
	@apply absolute inline-flex items-center top-1/2 left-2
	text-sm font-black
	-translate-y-1/2;
}

.title-bar-operations {
	@apply inline-flex flex-row items-center justify-end w-full h-full;
}

.operation {
	@apply inline-flex items-center justify-center w-12 h-full py-2 px-3
	cursor-pointer rounded-none
	text-slate-600 dark:text-slate-100 
	transition ease-in-out duration-300
	first:relative;
}
.operation:first-child::before {
	content: "";
	@apply absolute -left-1 h-2/3 w-px
	rounded-full
	bg-slate-300 dark:bg-slate-500;
}

.icon {
	@apply w-5 h-5;
}

.moving {
	@apply bg-slate-500 text-slate-100;
}
.moving.danger {
	@apply bg-red-400;
}

.darkmode {
	@apply w-10 py-1.5 px-3;
}
</style>
