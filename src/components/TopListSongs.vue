<script lang="ts" setup>
import Pagination from "@components/Pagination.vue"

import { ref, computed, onMounted, watch } from "vue"
import { usePaginationChanges } from "@composables/useComponentsUtils"
import { $bus } from "@composables/useMitt"

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

const switchSong = (songId: number) => {
	$bus.emit("song-switch", getComputedSongDetails(songId))
}
const getComputedSongDetails = (songId: number) => {
	const song = $props.songs.find((song) => song.id === songId)
	let computedSongArtist = ""
	if (song?.ar?.length)
		computedSongArtist = song?.ar.map((artist) => artist.name).join(" & ")

	const computedSong = {
		id: songId,
		title: song?.name,
		artist: computedSongArtist,
		image: song?.al?.picUrl,
	}
	console.log(`[Song Switched] ${songId}`)

	return computedSong
}
// const getComputedSongRuntime = (songId: number) => {
// 	const song = $props.songs.find((song) => song.id === songId)

// 	return {
// 		url: song?.url,
// 	}
// }
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
			<span
				class="song"
				v-for="song in computedSongs"
				:key="song.id"
				@click="switchSong(song.id)"
			>
				<span class="name">
					{{ song.name }}
					<span
						class="tns"
						v-if="song.tns?.length"
						:title="song.tns?.join('·')"
					>
						{{ song.tns?.join("·") }}
					</span>
				</span>
				<span class="artists">
					<span class="artist" v-for="artist in song.ar">
						{{ artist.name }}
					</span>
				</span>
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
	@apply w-full inline-flex flex-col justify-center gap-x-1 px-4 py-2
  rounded bg-sky-100 dark:bg-sky-900
  text-base
	transition-all ease-in-out duration-300;
}
.song .tns {
	@apply w-fit max-w-24 inline-block py-0.5 px-1
	rounded bg-blue-200 dark:bg-blue-600
	overflow-hidden text-ellipsis whitespace-nowrap
	text-xs;
}

.song .artists {
	@apply inline-flex items-center flex-wrap;
}
.artists .artist {
	@apply text-sm opacity-50;
}
.artist:not(:last-child)::after {
	@apply inline-block mx-0.5
	content-['&'] text-xs;
}
</style>
