import { fetch, Body, ResponseType } from "@tauri-apps/api/http"
import type { FetchOptions } from "@tauri-apps/api/http"
import type { RequestHeaders } from "@shared"
import { useCookie } from "@composables/useCookie"

const { stringToCookie, allCookies } = useCookie()

export class NeteaseCloudMusicApiRequest {
	private $headers: RequestHeaders = {
		accept: "application/json, text/plain, */*",
		"Access-Control-Allow-Credentials": "true",
	}
	private $uri: string = ""
	private $Option: FetchOptions = {
		method: "OPTIONS",
	}
	private $interceptors: {
		request: () => void
		response: () => void
	} = {
		request: () => {},
		response: () => {},
	}

	constructor(option: {
		baseURL: string
		headers: RequestHeaders
		timeout: number
	}) {
		const { baseURL, headers, timeout } = option

		this.$uri = baseURL
		this.$headers = Object.assign(headers, this.$headers)
		this.$Option = { ...this.$Option, timeout }
	}

	async get<T>(path: string, params?: any) {
		let reqUrl = this.$uri + path
		// Request Interception
		this.$interceptors.request()
		console.log(`[HTTP ST GET] #${path}`, params)
		console.time(path)
		// Request
		const response = await fetch<T>(reqUrl, {
			...this.$Option,
			method: "GET",
			headers: this.$headers,
			query: { ...params },
			responseType: ResponseType.JSON,
		}).catch((e) => {
			console.log("[HTTP ERROR]", e)
		})
		console.timeEnd(path)
		console.log("[HTTP RC GET]", response?.status)
		console.log("[HTTP RESPONSE GET]", response)

		if (response?.headers["set-cookie"])
			allCookies.value.push(stringToCookie([response.headers["set-cookie"]])[0])

		// Response Interception
		this.$interceptors.response()

		return response
	}

	async post<T>(path: string, params = {}) {
		let reqUrl = this.$uri + path
		// Request Interception
		this.$interceptors.request()
		console.log(`[HTTP ST POST] #${path}`)
		console.time(path)
		// Request
		const response = await fetch<T>(reqUrl, {
			...this.$Option,
			method: "POST",
			headers: this.$headers,
			body: Body.json({ ...params }),
			responseType: ResponseType.JSON,
		}).catch((e) => {
			console.log("[HTTP ERROR]", e)
		})
		console.timeEnd(path)
		console.log("[HTTP RC POST]", response?.status)
		console.log("[HTTP RESPONSE POST]", response)

		// Response Interception
		this.$interceptors.response()

		return response
	}

	setInterceptors(type: "response" | "request") {
		return (fn: () => void) => {
			this.$interceptors[type] = fn
		}
	}
}
