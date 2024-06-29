<script lang="ts" setup>
import TopListSongs from "@components/TopListSongs.vue"
import PlayListCreator from "@components/PlayListCreator.vue"

import { useRoute } from "vue-router"
import { computed, onDeactivated, onMounted, ref, watch } from "vue"
import { useValues } from "@composables/useValues"
import { BoundingObserver } from "@composables/useWindow"
import { $bus } from "@composables/useMitt"
import { PlayListDetail } from "@shared"

const { params } = useRoute()
const { hash: rawId } = params
const numberId = parseInt(rawId as string, 10)

const { $topListIDs, $topLists, $playLists, playListsUpdater } = useValues()
const isTopList =
	rawId === numberId.toString() ? $topListIDs.value.includes(numberId) : false
const $id = computed(() => (isTopList ? numberId : rawId))
const listData = computed(
	() =>
		$topLists.value.list[
			$topLists.value.list.findIndex((list) => list.id === $id.value)
		]
)

const listSongData = ref<PlayListDetail>()
onMounted(async () => {
	const update = () => {
		listSongData.value =
			$playLists.value[
				$playLists.value.findIndex((list) => list.id === numberId)
			]
	}
	playListsUpdater(rawId as string)
	update()
	watch(
		$playLists,
		() => {
			update()
			$bus.emit("dynamic-content-init")
		},
		{ deep: true }
	)
})

let RO: any = null
onMounted(() => {
	RO = new BoundingObserver("list")
	RO?.observe()
})
onDeactivated(() => {
	RO?.disconnect()
})
</script>

<template>
	<div class="view-list">
		<span class="title" v-if="isTopList">排行榜 #{{ $id }}</span>
		<span class="title" v-else>歌单 #{{ $id }}</span>
		<span class="top-list-info" v-if="isTopList">
			<img class="cover" :src="listData.coverImgUrl" alt="" />
			<span class="text">
				<span class="name">{{ listData.name }}</span>
				<PlayListCreator :creator="listSongData?.creator" />
				<span class="description">{{ listData.description }}</span>
				<span class="update"
					>更新于
					{{
						new Date(listData.updateTime).toLocaleDateString() +
						" " +
						new Date(listData.updateTime).toLocaleTimeString()
					}}</span
				>
			</span>
		</span>

		<TopListSongs v-if="isTopList" :songs="listSongData?.tracks" />
	</div>
</template>

<style lang="postcss" scoped>
.view-list {
	@apply h-[1064px] flex gap-1 md:p-4 lg:p-8
	select-none;
}

.title {
	@apply w-full flex items-center justify-center py-1
	text-sm opacity-40;
}

.top-list-info {
	@apply w-full h-48 flex items-center gap-4 py-2 md:px-24 lg:px-36;
}
.top-list-info .cover {
	@apply rounded md:w-36 md:h-36 lg:w-48 lg:h-48;
}
.top-list-info .text {
	@apply inline-flex flex-col;
}
.text .name {
	@apply text-lg font-semibold;
}
.text .description {
	@apply h-20 whitespace-pre-line text-sm
	overflow-y-auto
	text-gray-400;
}
.text .update {
	@apply text-xs text-gray-400;
}
</style>
