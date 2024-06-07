import { useDebounceFn, useStorage } from "@vueuse/core"
import { CountriesCodeSimpleReturn, TopListSimpleReturn } from "@shared"
import { useApi } from "@composables/useApi"
import { useCookie } from "@composables/useCookie"
import { computed } from "vue"

const { getCountriesCodeList, getTopLists } = useApi()
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
		).data.data
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
		).data
	}
	if ($topLists.value.code !== 200 || $topLists.value.list.length === 0) {
		await update()
	} else {
		let latest = $topLists.value.list[0].updateTime
		let now = new Date().getTime()
		for (const i of $topLists.value.list)
			if (i.updateTime > latest) latest = i.updateTime

		if (now - latest > 1000 * 60 * 60 * 24) await update()
	}
})

export const useValues = () => ({
	$countriesCodeList,
	countriesCodeListUpdater,
	$topLists,
	$topListIDs,
	topListsUpdater,
})
