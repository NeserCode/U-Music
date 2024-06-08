export interface BaseParams {
	realIP?: string
	timestamp?: number
	cookie?: string
	noCookie?: boolean
}

export interface PageLikeParams extends BaseParams {
	limit?: number
	offset?: number
}

export interface SimpleIDParams extends BaseParams {
	id: string
}
