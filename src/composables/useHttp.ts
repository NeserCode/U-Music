import { createFetch, type UseFetchOptions } from "@vueuse/core"

import type { RequestHeaders } from "@shared"

export const NeteaseCloudMusicApiFetch = (options: {
	baseURL: string
	headers?: RequestHeaders
	timeout?: number
	immediate?: boolean
	mode?: "no-cors" | "cors" | "same-origin"
	interceptors?: {
		request?: UseFetchOptions["beforeFetch"]
		response?: UseFetchOptions["afterFetch"]
		error?: UseFetchOptions["onFetchError"]
	}
}) => {
	return createFetch({
		baseUrl: options.baseURL,
		fetchOptions: {
			headers: {
				accept: "application/json, text/plain, */*",
				...(options.headers as any),
			},
			mode: options.mode ?? "cors",
		},
		options: {
			timeout: options.timeout ?? 0,
			immediate: options.immediate ?? false,
			beforeFetch: options.interceptors?.request,
			afterFetch: options.interceptors?.response,
			onFetchError: options.interceptors?.error,
		},
	})
}
