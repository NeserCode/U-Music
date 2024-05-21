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

export const useApi = () => {
	const getCountriesCodeList = async () => await api.get("countries/code/list")
	return {
		getCountriesCodeList,
	}
}
