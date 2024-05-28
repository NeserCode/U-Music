export interface RequestHeaders {
	authority?: string
	accept: string
	"accept-language"?: string
	"content-type"?: string
	"Access-Control-Allow-Origin"?: string
	"Access-Control-Allow-Credentials"?: string
	dnt?: string
	origin?: string
	referrer?: string
	"sec-ch-ua"?: string
	"sec-ch-ua-mobile"?: string
	"sec-ch-ua-platform"?: string
	"sec-fetch-dest"?: string
	"sec-fetch-mode"?: string
	"sec-fetch-site"?: string
	"sec-gpc"?: string
	"user-agent"?: string
}

export interface Cookie {
	name?: string
	value?: string
	"Max-Age"?: string
	Expires?: string
	Domain?: string
	Path?: string
	Secure?: boolean
	SameSite?: string

	[key: string]: any
}
