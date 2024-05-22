import NProgress from "nprogress"
import { NeteaseCloudMusicApiRequest } from "@composables/useHttp"
import { useServerConfig } from "@composables/useServerConfig"

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
	const getCountriesCodeList = async () => await api.get("countries/code/list")
	return {
		getCountriesCodeList,
	}
}
