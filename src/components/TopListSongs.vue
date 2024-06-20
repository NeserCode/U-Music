<script lang="ts" setup>
import Pagination from "@components/Pagination.vue"

import { ref, computed, onMounted, watch } from "vue"
import { usePaginationChanges } from "@composables/useComponentsUtils"

import type { PaginationPages, RawSongSearchData } from "@shared"

const $props = withDefaults(
	defineProps<{
		songs: RawSongSearchData[]
	}>(),
	{
		songs: () => [],
	}
)
const songPages = ref<PaginationPages>({
	total: 0,
	limit: 15,
	offset: 0,
})
const computedSongs = computed(() => {
	const { offset, limit } = songPages.value
	return $props.songs.slice(offset, offset + limit)
})
const songPageChanges = usePaginationChanges(songPages)

onMounted(() => {
	watch(
		() => $props.songs,
		() => {
			songPages.value.total = $props.songs.length
			songPages.value.offset = 0
			console.log($props.songs)
		},
		{ deep: true }
	)
})
</script>

<template>
	<div class="top-list-songs">
		<div class="songs-header">
			<span class="songs-title">Top songs</span>
			<span class="songs-count">
				{{ songPages.offset + 1 }} ~
				{{ songPages.offset + computedSongs.length }}</span
			>
		</div>
		<div class="songs-container">
			<span class="song" v-for="song in computedSongs" :key="song.id">
				{{ song.name }}
			</span>
		</div>
		<Pagination :pages="songPages" :changes="songPageChanges" />
	</div>
</template>

<style lang="postcss" scoped>
.top-list-songs {
	@apply w-full flex flex-col items-center justify-center md:px-16 lg:px-32 gap-2;
}

.songs-header {
	@apply inline-flex items-center justify-center gap-2
  text-sm font-bold opacity-50;
}

.songs-container {
	@apply w-full flex flex-col justify-center items-center md:px-12 lg:px-24 gap-2;
}
.song {
	@apply w-full inline-flex items-center gap-1 px-4 py-2
  rounded-md bg-sky-100 dark:bg-sky-900
  text-sm;
}
</style>
