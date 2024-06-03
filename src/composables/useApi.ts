import NProgress from "nprogress"
import { NeteaseCloudMusicApiRequest } from "@composables/useHttp"
import { useServerConfig } from "@composables/useServerConfig"
import {
	BaseParams,
	CountriesCodeSimpleReturn,
	TopListSimpleReturn,
} from "@shared"

const { server: appServer } = useServerConfig()
const api = new NeteaseCloudMusicApiRequest({
	baseURL: appServer.value,
	headers: {
		accept: "*/*",
	},
	timeout: 10000,
})

// Interceptors
api.setInterceptors("request")(() => {
	NProgress.start()
})
api.setInterceptors("response")(() => {
	NProgress.done()
})

export const useApi = () => {
	const getCountriesCodeList = async (params?: BaseParams) =>
		await api.get<CountriesCodeSimpleReturn>(
			"countries/code/list",
			params ?? {}
		)

	const getTopLists = async (params?: BaseParams) =>
		await api.get<TopListSimpleReturn>("toplist", params ?? {})

	return {
		getCountriesCodeList,
		getTopLists,
	}
}
