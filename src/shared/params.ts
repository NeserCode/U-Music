export interface BaseParams {
	realIP?: string
	timestamp?: number
	cookie?: string
	noCookie?: boolean
	os?: string
}

export interface PageLikeParams extends BaseParams {
	limit?: number
	offset?: number
}

export interface SimpleIDParams extends BaseParams {
	id: number | string | number[] | string[]
}

export interface SongResourceParams extends SimpleIDParams {
	level?:
		| "standard"
		| "higher"
		| "exhigh"
		| "lossless"
		| "hires"
		| "jyeffect"
		| "sky"
		| "dolby"
		| "jymaster"
}
