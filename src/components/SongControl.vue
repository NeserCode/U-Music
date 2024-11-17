<script lang="ts" setup>
import { $bus } from "@/composables/useMitt"
import {
	PlayIcon,
	PauseIcon,
	SpeakerXMarkIcon,
	SpeakerWaveIcon,
} from "@heroicons/vue/24/solid"
import { useStorage, watchOnce } from "@vueuse/core"
import { computed, nextTick, onMounted, ref } from "vue"

import { useApi } from "@composables/useApi"
import { UAudio } from "@/composables/useAudio"
import { SongResourceParams } from "@/shared"
import { MittSongStateParams } from "@/shared/mitt"

const $uaudio = ref<UAudio | null>(null)
const songRuntime = useStorage("song-runtime", {
	url: undefined,
	duration: 0,
	current: 0,
	playing: false,
	volume: 0.5,
	mute: false,
})
const playingSong = useStorage<MittSongStateParams>("u-playing-song", {
	id: -1,
	title: "当前未播放",
	artist: "--",
	image: "",
})
const playState = computed(() => songRuntime.value.playing)
const muteState = computed(() => songRuntime.value.mute)

const defaultQuality = useStorage<SongResourceParams["level"]>(
	"u-default-song-quality",
	"lossless"
)

function togglePlay() {
	songRuntime.value.playing = !songRuntime.value.playing
	if (songRuntime.value.playing) $uaudio.value?.play()
	else $uaudio.value?.pause()
}
function toggleMute() {
	songRuntime.value.mute = !songRuntime.value.mute
	if ($uaudio.value) $uaudio.value.muted = songRuntime.value.mute
}

onMounted(() => {
	const { getSongResource } = useApi()
	const trigger = (song: MittSongStateParams) => {
		console.log("[Song Control] Switch", song)

		const { data, execute } = getSongResource({
			id: song.id,
			level: defaultQuality.value,
		})

		watchOnce(data, () => {
			if (!data.value) return
			if (
				!data.value.data ||
				!data.value.data.length ||
				!data.value.data[0].url
			)
				return

			$uaudio.value = new UAudio(data.value.data[0].url)
			songRuntime.value.playing = false
			$uaudio.value.play()
			songRuntime.value.playing = true

			songRuntime.value.volume = $uaudio.value.volume
			songRuntime.value.mute = $uaudio.value.muted
			playingSong.value = song
			console.log("[Song Control] Audio", $uaudio.value)
		})

		execute()
	}
	$bus.on("song-switch", trigger)
	$bus.on("audio:canplaythrough", () => {
		console.log("[Song Control] Can play through")
	})

	$bus.on("scrollbar-init", () => {
		trigger(playingSong.value)
	})
})
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
