<script lang="ts" setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid"
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
	}),
})

const { pages, changes } = toRefs($props)
const totalPage = computed(() =>
	Math.ceil(pages.value.total / pages.value.limit)
)
const currentPage = computed(() => {
	const current = Math.round(pages.value.offset / pages.value.limit) + 1
	if (!!changes.value.page) changes.value.page(current)
	return current
})

const disabledSet = computed(() => {
	const { offset, limit, total } = pages.value
	return {
		prev: offset === 0 || total <= limit,
		next: offset + limit >= pages.value.total,
	}
})

const prevFn = useThrottleFn(() => {
	changes.value.prev()
}, 500)
const nextFn = useThrottleFn(() => {
	changes.value.next()
}, 500)
</script>

<template>
	<div class="pagination-main">
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
	</div>
</template>

<style lang="postcss" scoped>
.pagination-main {
	@apply w-full flex items-center justify-center gap-2 py-2;
}

.pagination-main .btn {
	@apply inline-flex justify-center items-center;
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
