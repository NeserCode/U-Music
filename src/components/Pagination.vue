<script lang="ts" setup>
import type { PaginationProps } from "@shared"

const $props = withDefaults(defineProps<PaginationProps>(), {
	pages: () => ({
		total: 0,
		offset: 1,
		limit: 10,
	}),
})
</script>

<template>
	<div class="pagination-main">
		{{ pages }}
	</div>
</template>

<style lang="postcss" scoped></style>
