import NProgress from "nprogress"
import { useCookie } from "@composables/useCookie"
import { NeteaseCloudMusicApiFetch } from "@composables/useHttp"
import { useServerConfig } from "@composables/useServerConfig"
import type {
	BaseParams,
	CountriesCodeSimpleReturn,
	PlayListSimpleReturn,
	SimpleIDParams,
	TopListSimpleReturn,
} from "@shared"
import { $bus } from "./useMitt"

const { server: appServer } = useServerConfig()
const { stringToCookie, allCookies } = useCookie()
const api = NeteaseCloudMusicApiFetch({
	baseURL: appServer.value,
	headers: {
		accept: "*/*",
	},
	// immediate: true,
	timeout: 10000,
	interceptors: {
		request: (ctx) => {
			NProgress.start()
			$bus.emit("http-request-pending", { fullPath: ctx.url })
			return ctx
		},
		response: (ctx) => {
			$bus.emit("http-response", {
				fullPath: ctx.response.url,
				status: ctx.response.status,
				data: ctx.data ?? null,
			})
			console.log("[HTTP RESPONSE GET]", ctx.response)
			if (ctx.response?.headers.getSetCookie().length)
				allCookies.value.push(
					stringToCookie(ctx.response?.headers.getSetCookie())[0]
				)
			NProgress.done()
			return ctx
		},
	},
})
const get = <T>(path: string, params?: any) => {
	console.log(`[HTTP PRE ST GET] #${path}`, params)
	const pathWithParams = `${path}?${new URLSearchParams(params).toString()}`
	$bus.emit("http-request-init", { fullPath: pathWithParams, path, params })
	return api(pathWithParams).get().json<T>()
}

export const useApi = () => {
	const getCountriesCodeList = (params?: BaseParams) =>
		get<CountriesCodeSimpleReturn>("countries/code/list", params ?? {})

	const getTopLists = (params?: BaseParams) =>
		get<TopListSimpleReturn>("toplist", params ?? {})

	const getSongList = (params: SimpleIDParams) =>
		get<PlayListSimpleReturn>("playlist/detail", params)

	return {
		getCountriesCodeList,
		getTopLists,
		getSongList,
	}
}
