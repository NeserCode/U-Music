import { $bus } from "./useMitt"

export class UAudio {
	private audio: HTMLAudioElement

	constructor(url: string) {
		this.audio = new Audio(url)

		this.audio.addEventListener("canplaythrough", () => {
			$bus.emit("audio:canplaythrough")
		})
		this.audio.addEventListener("ended", () => {
			$bus.emit("audio:ended")
		})
		this.audio.addEventListener("pause", () => {
			$bus.emit("audio:pause")
		})
		this.audio.addEventListener("play", () => {
			$bus.emit("audio:play")
		})

		$bus.on("song-switch", this.destroy)
	}

	async play() {
		await this.audio.play()
	}

	pause() {
		this.audio.pause()
	}

	set volume(volume: number) {
		if (volume < 0) volume = 0
		if (volume > 1) volume = 1
		this.audio.volume = volume
		$bus.emit("audio:volume-change", volume)
	}

	set loop(loop: boolean) {
		this.audio.loop = loop
		$bus.emit("audio:loop-change", loop)
	}

	set currentTime(time: number) {
		this.audio.currentTime = time
		$bus.emit("audio:time-change", time)
	}

	set muted(muted: boolean) {
		this.audio.muted = muted
		$bus.emit("audio:mute-change", muted)
	}

	destroy() {
		this.audio.pause()
		this.audio.src = ""
		this.audio.remove()
	}
}
