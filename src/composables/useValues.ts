import { useDebounceFn, useStorage } from "@vueuse/core"
import {
	CountriesCodeSimpleReturn,
	PlayListSimpleReturn,
	TopListSimpleReturn,
} from "@shared"
import { useApi } from "@composables/useApi"
import { useCookie } from "@composables/useCookie"
import { computed, watch } from "vue"

const { getCountriesCodeList, getTopLists, getSongList } = useApi()
const { allCookies: cookies, cookieToString } = useCookie()

// Cookie 使用
const cookie = computed(() => {
	const strings = []
	for (const c of cookies.value) strings.push(cookieToString(c as any))

	return encodeURIComponent(strings.join("; ") || "")
})

// 国家码列表
const $countriesCodeList = useStorage<CountriesCodeSimpleReturn["data"]>(
	"countries-code-list",
	[]
)
const countriesCodeListUpdater = useDebounceFn(() => {
	const { execute: update, data: countriesCodeList } = getCountriesCodeList({
		cookie: cookie.value,
	})
	watch(countriesCodeList, () => {
		$countriesCodeList.value = countriesCodeList.value?.data
	})
	if (
		$countriesCodeList.value.length === 0 ||
		!$countriesCodeList.value[0].label
	)
		return update()
}, 500)

// 排行榜列表
const $topLists = useStorage<TopListSimpleReturn>("top-lists", {
	code: -1,
	list: [],
	artistToplist: [],
})
const $topListIDs = computed(() => {
	if ($topLists.value.list.length !== 0)
		return $topLists.value.list.map((i) => i.id)
	return []
})
const topListsUpdater = useDebounceFn(() => {
	const { execute: update, data: topLists } = getTopLists({
		cookie: cookie.value,
	})
	watch(topLists, () => {
		if (topLists.value?.code === 200) $topLists.value = topLists.value
	})
	if ($topLists.value.code !== 200 || $topLists.value.list.length === 0)
		return update()
	else {
		let latest = $topLists.value.list[0].updateTime
		let now = new Date().getTime()
		for (const i of $topLists.value.list)
			if (i.updateTime > latest) latest = i.updateTime

		if (now - latest > 1000 * 60 * 60 * 24) return update()
	}
})

// 歌单
const $playLists = useStorage<PlayListSimpleReturn["playlist"][]>(
	"play-list",
	[]
)
const $playListIDs = computed(() => {
	if ($playLists.value.length !== 0) return $playLists.value.map((i) => i.id)
	return []
})
const playListsUpdater = useDebounceFn((id: string) => {
	const { execute: update, data: playList } = getSongList({
		id,
		cookie: cookie.value,
	})
	let shouldUpdateList = $playLists.value.find(
		(list) => list.id.toString() === id
	)
	watch(playList, () => {
		if (shouldUpdateList && playList.value !== null)
			shouldUpdateList = playList.value.playlist
		else if (!shouldUpdateList && playList.value !== null)
			$playLists.value.push(playList.value.playlist)
	})

	const included = $playListIDs.value.includes(parseInt(id, 10))
	if ($playListIDs.value.length === 0 || !included) return update()
	else if (included) {
		let latest = shouldUpdateList?.updateTime
		let now = new Date().getTime()
		if (latest && now - latest > 1000 * 60 * 60 * 24) {
			console.log(`Playlist ${id} overtime`, now, latest, shouldUpdateList)
			return update()
		}
	}
})

export const useValues = () => ({
	$countriesCodeList,
	countriesCodeListUpdater,
	$topLists,
	$topListIDs,
	topListsUpdater,
	$playLists,
	$playListIDs,
	playListsUpdater,
})
