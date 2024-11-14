<script lang="ts" setup>
import { MusicalNoteIcon } from "@heroicons/vue/24/solid"
import { toRefs } from "vue"

const $props = defineProps<{
	song: {
		title?: string
		artist?: string
		image?: string
	}
}>()
const { song } = toRefs($props)
</script>

<template>
	<div class="song-state">
		<div class="song-image">
			<img :src="song.image" alt="Song image" class="icon" v-if="song.image" />
			<MusicalNoteIcon class="icon" v-else />
		</div>
		<div class="song-info">
			<span class="title" :title="song.title">{{ song.title }}</span>
			<span class="artist" :title="song.artist">{{ song.artist }}</span>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.song-state {
	@apply absolute left-4 inline-flex flex-nowrap flex-row items-center justify-center px-2 py-1 gap-1
  rounded bg-slate-200 dark:bg-slate-700
  transition-all ease-in-out duration-300;
}

.song-image {
	@apply w-7 h-7;
}
.song-image .icon {
	@apply rounded fill-slate-500 dark:fill-slate-400
  transition-all ease-in-out duration-300;
}

.song-info {
	@apply flex flex-nowrap flex-col items-start justify-center
  text-xs;
}
.song-info span {
	@apply block max-w-36 truncate;
}

.song-info .title {
	@apply font-bold;
}
</style>
