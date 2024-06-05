<script lang="ts" setup>
import Pagination from "@components/Pagination.vue"
import { PhotoIcon } from "@heroicons/vue/24/solid"
import { computed, watch, ref } from "vue"
import { useValues } from "@composables/useValues"
import { usePaginationChanges } from "@composables/useComponentsUtils"

import type { PaginationPages } from "@shared"

const { $topLists } = useValues()
const topListPages = ref<PaginationPages>({
	total: 0,
	offset: 0,
	limit: 10,
})
const topLists = computed(() => $topLists.value.list)
watch(
	topLists,
	() => {
		topListPages.value.total = topLists.value.length
	},
	{ immediate: true }
)

const computedTopLists = computed(() => {
	const { offset, limit } = topListPages.value
	return topLists.value.slice(offset, offset + limit)
})
const topListPageChanges = usePaginationChanges(topListPages)
</script>

<template>
	<div class="top-list-main" ondragstart="javascript:return false">
		<div class="top-list-header">
			<span class="text">排行榜</span>
			<span class="list-count"> {{ topLists.length ?? 0 }} </span>
		</div>
		<div class="top-list-list" v-if="topLists.length > 0">
			<div class="top-list" v-for="list of computedTopLists" :key="list.id">
				<RouterLink class="cover" :to="`/list/${list.id}`">
					<img
						v-if="list.coverImgUrl"
						:src="list.coverImgUrl"
						referrerpolicy="no-referrer"
						alt="Cover"
					/>
					<PhotoIcon v-else class="icon" />
				</RouterLink>
				<span class="info">
					<RouterLink :to="`/list/${list.id}`" class="title">
						{{ list.name }}
						<span class="songs-count">{{ list.ToplistType }}</span>
					</RouterLink>
				</span>
			</div>
		</div>
		<Pagination :pages="topListPages" :changes="topListPageChanges" />
	</div>
</template>

<style lang="postcss" scoped>
.top-list-main {
	@apply flex flex-col justify-center w-full h-full px-6;
}

.top-list-header {
	@apply flex items-center w-full gap-2 mb-4;
}
.top-list-header .icon {
	@apply md:w-6 md:h-6 lg:w-7 lg:h-7
  text-gray-500 dark:text-gray-200
  transition-colors ease-in-out duration-300;
}
.top-list-header .text {
	@apply md:text-lg lg:text-xl;
}
.top-list-header .list-count {
	@apply inline-block
	font-semibold text-sm opacity-50
	transition-colors ease-in-out duration-300;
}

.top-list-list {
	@apply w-full flex flex-wrap gap-2;
}
.top-list {
	@apply relative w-fit flex flex-col gap-1 px-3 py-1;
}
.top-list .cover {
	@apply w-full md:h-28 lg:h-36 overflow-hidden flex items-center justify-center
  border-2 rounded border-slate-300 dark:border-slate-500
  transition-all ease-in-out duration-300 cursor-pointer;
}
.top-list .cover img {
	@apply w-full h-full object-cover;
}
.top-list .cover .icon {
	@apply w-8 h-8;
}

.top-list .info {
	@apply inline-flex flex-col justify-center;
}
.info .title {
	@apply inline-block md:w-28 lg:w-36 text-sm
  transition-colors ease-in-out duration-300;
}
.info .songs-count {
	@apply text-xs opacity-50;
}

.top-list:hover .cover,
.top-list:hover .info .title {
	@apply text-green-500 border-green-500;
}
</style>
