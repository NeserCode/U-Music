<script lang="ts" setup>
import {
	PlayIcon,
	PauseIcon,
	SpeakerXMarkIcon,
	SpeakerWaveIcon,
} from "@heroicons/vue/24/solid"
import { useStorage } from "@vueuse/core"
import { computed } from "vue"

const songRuntime = useStorage("song-runtime", {
	url: undefined,
	duration: 0,
	current: 0,
	playing: false,
	volume: 0.5,
	mute: false,
})
const playState = computed(() => songRuntime.value.playing)
const muteState = computed(() => songRuntime.value.mute)

function togglePlay() {
	songRuntime.value.playing = !songRuntime.value.playing
}
function toggleMute() {
	songRuntime.value.mute = !songRuntime.value.mute
}
</script>

<template>
	<div class="song-control">
		<span class="controller play" @click="togglePlay">
			<PauseIcon class="icon" v-if="!playState" />
			<PlayIcon class="icon" v-else />
		</span>
		<span class="controller mute" @click="toggleMute">
			<SpeakerWaveIcon class="icon" v-if="!muteState" />
			<SpeakerXMarkIcon class="icon" v-else />
		</span>

		<audio class="song" v-if="songRuntime.url" :src="songRuntime.url" controls>
			Your browser does not support the audio element.
		</audio>
	</div>
</template>

<style lang="postcss" scoped>
.song-control {
	@apply absolute right-4 inline-flex justify-center items-center gap-2 px-3 py-1.5
  rounded bg-zinc-200 dark:bg-zinc-700
  transition-all ease-in-out duration-300;
}

.controller .icon {
	@apply w-5 h-5 cursor-pointer
  fill-slate-500 dark:fill-slate-300
  transition-all ease-in-out duration-300;
}
</style>
