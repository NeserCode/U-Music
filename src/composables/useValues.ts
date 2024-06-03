import { useDebounceFn, useStorage } from "@vueuse/core"
import { CountriesCodeSimpleReturn, TopListSimpleReturn } from "@shared"
import { useApi } from "@composables/useApi"
import { useCookie } from "@composables/useCookie"
import { computed } from "vue"

const { getCountriesCodeList, getTopLists } = useApi()
const { allCookies: cookies, cookieToString } = useCookie()

const cookie = computed(() => {
	const strings = []
	for (const c of cookies.value) strings.push(cookieToString(c as any))

	return encodeURIComponent(strings.join("; ") || "")
})

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

const $topLists = useStorage<TopListSimpleReturn>("top-lists", {
	code: -1,
	list: [],
	artistToplist: [],
})
const topListsUpdater = useDebounceFn(async () => {
	if ($topLists.value.code !== 200 || $topLists.value.list.length === 0) {
		$topLists.value = (
			await getTopLists({
				cookie: cookie.value,
			})
		).data
	}
})

export const useValues = () => ({
	$countriesCodeList,
	countriesCodeListUpdater,
	$topLists,
	topListsUpdater,
})
