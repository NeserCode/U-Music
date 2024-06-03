<script lang="ts" setup>
import type { PaginationProps } from "@shared"
import { computed, toRefs } from "vue"

const $props = withDefaults(defineProps<PaginationProps>(), {
	pages: () => ({
		total: 0,
		offset: 0,
		limit: 10,
	}),
})

const { pages } = toRefs($props)
const totalPage = computed(() =>
	Math.ceil((pages.value.total - pages.value.offset) / pages.value.limit)
)
const currentPage = computed(
	() => Math.round(pages.value.offset / pages.value.limit) + 1
)
</script>

<template>
	<div class="pagination-main">
		total: {{ totalPage }}, current: {{ currentPage }}
	</div>
</template>

<style lang="postcss" scoped></style>
