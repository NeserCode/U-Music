import { useDebounceFn, useStorage } from "@vueuse/core"
import {
	CountriesCodeSimpleReturn,
	PlayListSimpleReturn,
	TopListSimpleReturn,
} from "@shared"
import { useApi } from "@composables/useApi"
import { useCookie } from "@composables/useCookie"
import { computed } from "vue"

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
const countriesCodeListUpdater = useDebounceFn(async () => {
	if (
		$countriesCodeList.value.length === 0 ||
		!$countriesCodeList.value[0].label
	) {
		$countriesCodeList.value = (
			await getCountriesCodeList({
				cookie: cookie.value,
			})
		)?.data.data
	}

	return $countriesCodeList
}, 500)

// 排行榜列表
const $topLists = useStorage<TopListSimpleReturn>("top-lists", {
	code: -1,
	list: [],
	artistToplist: [],
})
const $topListIDs = computed(() => $topLists.value.list.map((i) => i.id))
const topListsUpdater = useDebounceFn(async () => {
	const update = async () => {
		$topLists.value = (
			await getTopLists({
				cookie: cookie.value,
			})
		)?.data
	}
	if ($topLists.value.code !== 200 || $topLists.value.list.length === 0)
		await update()
	else {
		let latest = $topLists.value.list[0].updateTime
		let now = new Date().getTime()
		for (const i of $topLists.value.list)
			if (i.updateTime > latest) latest = i.updateTime

		if (now - latest > 1000 * 60 * 60 * 24) await update()
	}
})

// 歌单
const $playLists = useStorage<PlayListSimpleReturn["playlist"][]>(
	"play-list",
	[]
)
const $playListIDs = computed(() => $playLists.value.map((i) => i.id))
const playListsUpdater = useDebounceFn(async (id: string) => {
	let shouldUpdateList = $playLists.value.find(
		(list) => list.id.toString() === id
	)
	const update = async () => {
		let res = await getSongList({ id })
		if (!shouldUpdateList) {
			if (res) $playLists.value.push(res.data.playlist)
		} else if (res) shouldUpdateList = res.data.playlist

		return res?.data.playlist
	}
	if (
		$playListIDs.value.length === 0 ||
		!$playListIDs.value.includes(parseInt(id, 10))
	)
		return await update()
	else {
		let latest = shouldUpdateList?.updateTime
		let now = new Date().getTime()
		if (latest && now - latest > 1000 * 60 * 60 * 12) return await update()
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
