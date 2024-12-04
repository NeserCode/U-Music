<script lang="ts" setup>
import Pagination from "@/components/Pagination.vue"

import { useApi } from "@/composables/useApi"
import { usePaginationChanges } from "@/composables/useComponentsUtils"
import { $bus } from "@/composables/useMitt"
import { PaginationPages, RawSongSearchData } from "@/shared"
import { watchOnce } from "@vueuse/core"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const keywords = route.params.keywords as string
const searchResults = ref<RawSongSearchData[]>([])

const songPages = ref<PaginationPages>({
	total: 0,
	limit: 15,
	offset: 0,
})
const computedSongs = computed(() => {
	const { offset, limit } = songPages.value
	return searchResults.value.slice(offset, offset + limit)
})
const songPageChanges = usePaginationChanges(songPages)

onMounted(async () => {
	const { getSongSearch } = useApi()
	const { execute, data } = getSongSearch({ keywords, limit: 100 })
	execute()
	watchOnce(data, () => {
		if (!data.value) return
		if (!data.value || !data.value.result || !data.value.result.songs.length)
			return
		searchResults.value = data.value.result.songs
		songPages.value.total = data.value.result.songs.length
		songPages.value.offset = 0
	})
})

const switchSong = (songId: number) => {
	$bus.emit("song-switch", getComputedSongDetails(songId))
}
const getComputedSongDetails = (songId: number) => {
	const song = searchResults.value.find((song) => song.id === songId)
	let computedSongArtist = ""
	if (song?.ar?.length)
		computedSongArtist = song?.ar.map((artist) => artist.name).join(" & ")

	const computedSong = {
		id: songId,
		title: song?.name,
		artist: computedSongArtist,
		image: song?.al?.picUrl,
	}

	return computedSong
}
</script>

<template>
	<div class="view-search">
		<div class="songs-container">
			<span
				class="song"
				v-for="song in computedSongs"
				:key="song.id"
				@click="switchSong(song.id)"
			>
				<span class="fee" v-if="song.fee < 8"> </span>
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
.view-search {
	@apply w-full flex flex-col items-center py-12;
}
.songs-container {
	@apply w-full flex flex-col justify-center items-center md:px-12 lg:px-24 gap-2;
}
.song {
	@apply relative w-full inline-flex flex-col justify-center gap-x-1 px-4 py-2
  rounded bg-sky-100 dark:bg-sky-900
  text-base overflow-hidden cursor-pointer
	transition-all ease-in-out duration-300
	opacity-80 hover:opacity-100;
}
.song .fee {
	@apply absolute w-5 h-5 -top-0 -left-0 text-xs font-bold
	bg-yellow-400 dark:bg-yellow-200
	rotate-45 origin-center -translate-x-2.5 -translate-y-2.5
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
