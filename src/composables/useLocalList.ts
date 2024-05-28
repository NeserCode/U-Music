import { useStorage } from "@vueuse/core"
import { createHash } from "crypto"
import { Ref } from "vue"

export class LocalList {
	public hash = createHash("sha256")
		.update(Math.random().toString())
		.digest("hex")
	public key: string = ""
	public profile: Ref<any>
	public songs: Ref<any[]>

	constructor(key: string) {
		if (!!key) this.key = key
		else this.key = this.hash

		this.songs = useStorage(`local-list-songs-${this.key}`, [])
		this.profile = useStorage(`local-list-profile-${this.key}`, {})
	}
}

export function useLocalList(key: string) {
	return {
		localList: new LocalList(key),
	}
}
