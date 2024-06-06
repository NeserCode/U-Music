import { useStorage } from "@vueuse/core"
import Sqids from "sqids"
import { computed } from "vue"

import { useConstant } from "@composables/useConstant"
import type { ListProfile, SongData } from "@shared"

const { defaults } = useConstant()
const sqids = new Sqids()
const localHashList = useStorage<string[]>("local-hash-list", [])
const localKeyList = useStorage<string[]>("local-key-list", [])

export class LocalList {
	public hash: string | null
	public key: string
	public profile: ListProfile | null
	public songs: SongData[]

	constructor(key: string) {
		this.key = key
		this.hash = useStorage(
			`local-list-hash-${this.key}`,
			sqids.encode([Math.floor(Math.random() * 10000)])
		).value
		this.songs = useStorage(`local-list-songs-${this.key}`, []).value
		this.profile = useStorage(
			`local-list-profile-${this.key}`,
			defaults.listProfile
		).value
	}

	create(profile?: ListProfile) {
		if (LocalList.exists(this.hash!)) return
		else if (!!profile)
			this.profile = Object.assign(this.profile ?? {}, profile)
		localHashList.value.push(this.hash!)
		localKeyList.value.push(this.key)
	}

	update(type: "cover" | "name" | "description", param: string) {
		if (!!type && !!param) this.profile![type] = param
		localStorage.setItem(
			`local-list-profile-${this.key}`,
			JSON.stringify(this.profile)
		)
	}

	remove() {
		localHashList.value = localHashList.value.filter(
			(hash) => hash !== this.hash
		)
		localKeyList.value = localKeyList.value.filter((key) => key !== this.key)
		this.songs = []
		this.profile = null
		this.hash = null

		localStorage.removeItem(`local-list-hash-${this.key}`)
		localStorage.removeItem(`local-list-songs-${this.key}`)
		localStorage.removeItem(`local-list-profile-${this.key}`)
	}

	static exists(hash: string) {
		return !!localHashList.value.includes(hash)
	}
}

export function useLocalList(key: string) {
	const hash = localStorage.getItem(`local-list-hash-${key}`) ?? ""
	if (!LocalList.exists(hash)) return
	return new LocalList(key)
}

export function useLocalLists() {
	return computed(() => {
		const lists: LocalList[] = []
		localKeyList.value.forEach((key) => {
			const l = useLocalList(key)
			if (l) lists.push(l)
		})
		return lists
	})
}

export const useHashList = () => localHashList
export const useKeyList = () => localKeyList
