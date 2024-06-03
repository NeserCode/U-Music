export interface BaseReturn {
	/** The request URL. */
	url: string
	/** The response status code. */
	status: number
	/** A boolean indicating whether the response was successful (status in the range 200–299) or not. */
	ok: boolean
	/** The response headers. */
	headers: Record<string, string>
	/** The response raw headers. */
	rawHeaders: Record<string, string[]>
}

export interface CountriesCodeSimpleReturn {
	code: number
	message: string
	data: {
		countryList: {
			zh: string
			en: string
			code: string
			locale: string
		}[]
		label: string
	}[]
}
export interface CountriesCodeReturn extends BaseReturn {
	data: CountriesCodeSimpleReturn
}

export interface ArtistTopList {
	coverUrl: string
	name: string
	updateFrequency: string
	position: number
}
export interface TopList {
	subscribers: any[]
	subscribed: boolean
	creator: any
	artists: any
	tracks: any
	updateFrequency: string
	backgroundCoverId: number
	backgroundCoverUrl: any
	titleImage: number
	coverText: any
	titleImageUrl: any
	coverImageUrl: any
	iconImageUrl: any
	englishTitle: any
	opRecommend: boolean
	recommendInfo: any
	socialPlaylistCover: any
	tsSongCount: number
	highQuality: boolean
	specialType: number
	coverImgId: number
	newImported: boolean
	anonimous: boolean
	updateTime: number
	coverImgUrl: string
	trackCount: number
	commentThreadId: string
	trackUpdateTime: number
	totalDuration: number
	trackNumberUpdateTime: number
	privacy: number
	playCount: number
	adType: number
	subscribedCount: number
	cloudTrackCount: number
	createTime: number
	ordered: boolean
	description: string
	status: number
	tags: string[]
	userId: number
	name: string
	id: number
	coverImgId_str: string
	ToplistType: string
}
export interface TopListSimpleReturn {
	code: number
	list: TopList[]
	artistToplist: ArtistTopList[]
}
export interface TopListReturn extends BaseReturn {
	data: TopListSimpleReturn
}
