import { useStorage } from "@vueuse/core"
import Sqids from "sqids"
import { computed, type Ref } from "vue"

import { useConstant } from "@composables/useConstant"
import type { ListProfile } from "@shared"

const { defaults } = useConstant()
const sqids = new Sqids()
const localHashList = useStorage<string[]>("local-hash-list", [])
const localKeyList = useStorage<string[]>("local-key-list", [])

export class LocalList {
	public hash: Ref<string | null>
	public key: string
	public profile: Ref<ListProfile | null>
	public songs: Ref<any[] | null>

	constructor(key: string) {
		this.key = key
		this.hash = useStorage(
			`local-list-hash-${this.key}`,
			sqids.encode([Math.floor(Math.random() * 10000)])
		)
		this.songs = useStorage(`local-list-songs-${this.key}`, [])
		this.profile = useStorage(
			`local-list-profile-${this.key}`,
			defaults.listProfile
		)
	}

	create(profile?: ListProfile) {
		if (LocalList.exists(this.hash.value!)) return
		else if (!!profile)
			this.profile.value = Object.assign(this.profile.value ?? {}, profile)
		localHashList.value.push(this.hash.value!)
		localKeyList.value.push(this.key)
	}

	update(type: "cover" | "name" | "description", param: any) {
		if (!!type && !!param) this.profile.value![type] = param
		localStorage.setItem(
			`local-list-profile-${this.key}`,
			JSON.stringify(this.profile.value!)
		)
	}

	remove() {
		localHashList.value = localHashList.value.filter(
			(hash) => hash !== this.hash.value
		)
		localKeyList.value = localKeyList.value.filter((key) => key !== this.key)
		this.songs.value = null
		this.profile.value = null
		this.hash.value = null

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
			if (l) lists.push(l as LocalList)
		})
		return lists
	})
}

export const useHashList = () => localHashList
export const useKeyList = () => localKeyList
