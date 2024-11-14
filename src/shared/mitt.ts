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

export interface MittSongEventBaseParams {
	id: number
}
export interface MittSongStateParams extends MittSongEventBaseParams {
	title?: string
	artist?: string
	image?: string
}
export interface MittSongRuntimeParams extends MittSongEventBaseParams {
	playing: boolean
	mute: boolean
	volume: number
	url: string
	duration: number
	current: number
}

export type MittEvent = {
	"scrollbar-init"?: void
	"dynamic-content-init"?: void
	"http-request-init"?: MittHttpReqParams
	"http-request-pending"?: MittHttpReqParams
	"http-response"?: MittHttpResParams

	"song-switch": MittSongStateParams
	"song-play": MittSongRuntimeParams
}
