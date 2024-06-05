<script lang="ts" setup>
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ArrowUturnLeftIcon,
	ArrowUturnRightIcon,
} from "@heroicons/vue/24/solid"
import type { PaginationProps } from "@shared"
import { useThrottleFn } from "@vueuse/core"
import { computed, toRefs } from "vue"

const $props = withDefaults(defineProps<PaginationProps>(), {
	pages: () => ({
		total: 0,
		offset: 0,
		limit: 10,
	}),
	changes: () => ({
		prev: () => {},
		next: () => {},
		page: () => {},
		top: () => {},
		bottom: () => {},
	}),
})

const { pages, changes } = toRefs($props)
const totalPage = computed(() =>
	Math.ceil(pages.value.total / pages.value.limit)
)
const currentPage = computed(() => {
	const current = Math.floor(pages.value.offset / pages.value.limit) + 1
	if (!!changes.value.page) changes.value.page(current)
	return current
})

const disabledSet = computed(() => {
	const { offset, limit, total } = pages.value
	return {
		prev: offset === 0 || total <= limit,
		next: offset + limit >= pages.value.total,
		top: offset === 0 || total <= limit,
		bottom: offset + limit >= pages.value.total,
	}
})

const prevFn = useThrottleFn(() => {
	changes.value.prev()
}, 500)
const nextFn = useThrottleFn(() => {
	changes.value.next()
}, 500)
const topFn = useThrottleFn(() => {
	if (!!changes.value.top) changes.value.top()
}, 500)
const bottomFn = useThrottleFn(() => {
	if (!!changes.value.bottom) changes.value.bottom()
}, 500)
</script>

<template>
	<div class="pagination-main">
		<button
			class="list-top btn"
			:class="{ 'btn-disabled': disabledSet.prev }"
			type="button"
			@click="topFn"
			:disabled="disabledSet.prev"
		>
			<ArrowUturnLeftIcon class="icon" />
		</button>
		<button
			class="prev btn"
			:class="{ 'btn-disabled': disabledSet.prev }"
			type="button"
			@click="prevFn"
			:disabled="disabledSet.prev"
		>
			<ChevronLeftIcon class="icon" />
		</button>
		<span class="text">{{ currentPage }}/{{ totalPage }}</span>
		<button
			class="next btn"
			:class="{ 'btn-disabled': disabledSet.next }"
			type="button"
			@click="nextFn"
			:disabled="disabledSet.next"
		>
			<ChevronRightIcon class="icon" />
		</button>
		<button
			class="list-bottom btn"
			:class="{ 'btn-disabled': disabledSet.next }"
			type="button"
			@click="bottomFn"
			:disabled="disabledSet.next"
		>
			<ArrowUturnRightIcon class="icon" />
		</button>
	</div>
</template>

<style lang="postcss" scoped>
.pagination-main {
	@apply w-full flex items-center justify-center gap-2 py-2;
}

.pagination-main .btn {
	@apply inline-flex justify-center items-center p-1.5
	rounded
	bg-slate-200 dark:bg-slate-500
	hover:bg-slate-300 dark:hover:bg-slate-400
	transition-colors ease-in-out duration-300;
}
.btn .icon {
	@apply w-4 h-4;
}
.btn-disabled {
	@apply opacity-50 cursor-not-allowed;
}
.text {
	@apply text-sm;
}
</style>
