export interface MittHttpBaseParams {
	fullPath: string
	path?: string
}
export interface MittHttpReqParams extends MittHttpBaseParams {
	params?: Record<string, string>
}
export interface MittHttpResParams extends MittHttpBaseParams {
	status: number
	data?: any
}

export type MittEvent = {
	"scrollbar-init"?: void
	"dynamic-content-init"?: void
	"http-request-init"?: MittHttpReqParams
	"http-request-pending"?: MittHttpReqParams
	"http-response"?: MittHttpResParams
}
