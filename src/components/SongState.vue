<script lang="ts" setup>
import { MusicalNoteIcon } from "@heroicons/vue/24/solid"
import { useStorage } from "@vueuse/core"
import { computed, toRefs } from "vue"

const $props = defineProps<{
	song: {
		title?: string
		artist?: string
		image?: string
	}
}>()
const { song } = toRefs($props)
const songRuntime = useStorage("song-runtime", {
	url: undefined,
	duration: 0,
	current: 0,
	playing: false,
	volume: 0.5,
	mute: false,
})
const songPlayed = computed(
	() => songRuntime.value.current / songRuntime.value.duration
)
const songPlaying = computed(
	()=> songRuntime.value.playing
)
</script>

<template>
	<div class="song-state">
		<div class="cliper-back"></div>
		<div
			:class="['cliper', songPlaying ? 'playing' : null]"
			:style="{ clipPath: `inset(0px 0px 0px ${songPlayed * 100}% )` }"
		></div>
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
  rounded 
  transition-all ease-in-out duration-300;
}

.song-image {
	@apply w-7 h-7;
}
.song-image .icon {
	@apply w-7 h-7 rounded fill-slate-500 dark:fill-slate-400
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

.cliper-back {
	@apply absolute top-0 left-0 w-full h-full
  rounded bg-slate-300 dark:bg-slate-500
	z-0 transition-all ease-in-out duration-300;
}
.cliper {
	@apply absolute top-0 left-0 w-full h-full
	rounded bg-slate-200 dark:bg-slate-700
	z-10 transition-all ease-in-out duration-300;
}
.cliper-back:has( + .cliper.playing){
	@apply bg-green-300 dark:bg-green-600;
}
.song-image,
.song-info {
	@apply z-20;
}
</style>
