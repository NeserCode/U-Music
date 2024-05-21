import { useStorage } from "@vueuse/core"

export class LocalList {
	private defaultKey = "u-music-local-list"
	public key: string = ""
	public songs: any

	constructor(key?: string) {
		if (!!key) this.key = key
		else this.key = this.defaultKey

		this.songs = useStorage(this.key, [])
	}
}

export function useLocalList(key?: string) {
	return {
		localList: new LocalList(key),
	}
}
