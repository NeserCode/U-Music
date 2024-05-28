import { useDebounceFn, useStorage } from "@vueuse/core"
import { CountriesCodeSimpleReturn } from "@shared"
import { useApi } from "@composables/useApi"
import { useCookie } from "@composables/useCookie"
import { computed } from "vue"

const { getCountriesCodeList } = useApi()
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

export const useValues = () => ({
	$countriesCodeList,
	countriesCodeListUpdater,
})
