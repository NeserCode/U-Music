<script lang="ts" setup>
import { useRoute } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { useValues } from "@composables/useValues"
import { useApi } from "@composables/useApi"

const { params } = useRoute()
const { hash: rawId } = params
const numberId = parseInt(rawId as string, 10)

const { $topListIDs, $topLists } = useValues()
const isTopList =
	rawId === numberId.toString() ? $topListIDs.value.includes(numberId) : false
const $id = computed(() => (isTopList ? numberId : rawId))
const listData = computed(
	() =>
		$topLists.value.list[
			$topLists.value.list.findIndex((list) => list.id === $id.value)
		]
)

const listSongData = ref()
onMounted(async () => {
	const { getSongList } = useApi()
	const data = await getSongList({ id: rawId as string })
	listSongData.value = data
})
</script>

<template>
	<div class="view-list">
		<span class="title" v-if="isTopList">排行榜 {{ $id }}</span>
		<span class="title" v-else>歌单 {{ $id }}</span>
		<span class="top-list-info" v-if="isTopList">
			<img class="cover" :src="listData.coverImgUrl" alt="" />
			<span class="text">
				<span class="name">{{ listData.name }}</span>
				<span class="description">{{ listData.description }}</span>
				<span class="update"
					>更新于 {{ new Date(listData.updateTime).toLocaleDateString() }}</span
				>
			</span>
		</span>
	</div>
</template>

<style lang="postcss" scoped>
.title {
	@apply w-full flex items-center justify-center py-1
	text-sm opacity-40;
}

.top-list-info {
	@apply w-full flex items-center gap-4 py-2 md:px-24 lg:px-36;
}
.top-list-info .cover {
	@apply md:w-36 md:h-36 lg:w-48 lg:h-48;
}
.top-list-info .text {
	@apply inline-flex flex-col;
}
.text .name {
	@apply text-lg font-semibold;
}
.text .description {
	@apply whitespace-pre-line text-sm
	text-gray-400;
}
.text .update {
	@apply text-xs text-gray-400;
}
</style>
