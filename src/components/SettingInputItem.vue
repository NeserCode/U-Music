<script lang="ts" setup>
import Dialog from "@presets/Dialog.vue"

import { toRefs } from "@vueuse/core"

const switchProps = withDefaults(
	defineProps<{
		disabled?: boolean
		open?: () => void
		close?: () => void
	}>(),
	{
		disabled: false,
		open: () => {},
		close: () => {},
	}
)
const { disabled, open, close } = toRefs(switchProps)
</script>

<template>
	<div class="setting-input-item">
		<div class="setting-constants">
			<span class="setting-title">
				<slot name="oTitle"></slot>
			</span>
			<span class="setting-tips">
				<slot name="tips"></slot>
			</span>
		</div>

		<div class="setting-operation">
			<Dialog :disabled="disabled" :open="open" :close="close">
				<template #btn><slot name="btn"></slot></template>
				<template #title><slot name="title"></slot></template>
				<template #content><slot name="content"></slot></template>
				<template #confirm><slot name="confirm"></slot></template>
			</Dialog>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.setting-input-item {
	@apply md:w-full lg:w-2/5 h-full flex items-center justify-center py-4 px-4 gap-2
	hover:bg-sky-100 dark:hover:bg-sky-800
	border-2 border-transparent hover:border-sky-200 dark:hover:border-sky-700
	transition-all ease-in-out duration-300
	rounded-md select-none;
}

.setting-constants {
	@apply w-full
	flex flex-col justify-center;
}

.setting-title {
	@apply text-base font-normal;
}
.setting-tips {
	@apply text-sm text-gray-400;
}

.setting-operation {
	@apply w-fit h-full inline-flex items-center justify-center;
}
</style>
