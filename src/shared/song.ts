export interface RawArtistData {
	id: number
	name: string
	tns: any[]
	alias: any[]
}

export interface RawSimpleArtistData {
	id: number
	name: string
}

export interface RawAlbumData {
	id: number
	name: string
	picUrl: string
	tns: any[]
	pic_str: string
	pic: number
}

export interface RawSimpleAlbumData {
	id: number
	name: string
}

export interface RawQualityData {
	br: number
	fid: number
	size: number
	vd: number
	sr: number
}

export interface RawOriginSongSimpleData {
	songId: number
	name: string
	artists: RawSimpleArtistData[]
	albumMeta: RawSimpleAlbumData
}

export interface RawFreeTrialPrivilegeData {
	resConsumable: boolean
	userConsumable: boolean
	listenType: any
	cannotListenReason: any
	playReason?: any
}

export interface RawFreeTimeTrialPrivilegeData {
	resConsumable: boolean
	userConsumable: boolean
	type: number
	remainTime: number
}

export interface RawSongChargeInfo {
	rate: number
	chargeUrl: any
	chargeType: number
	chargeMessage: any
}

export interface RawSongPrivilegeData {
	id: number
	fee: number
	payed: number
	st: number
	pl: number
	dl: number
	sp: number
	cp: number
	subp: number
	cs: number
	maxbr: number
	fl: number
	toast: boolean
	flag: number
	preSell: boolean
	playMaxbr: number
	downloadMaxbr: number
	maxBrLevel: string
	playMaxBrLevel: string
	downloadMaxBrLevel: string
	plLevel: string
	dlLevel: string
	flLevel: string
	rscl: number
	freeTrialPrivilege: RawFreeTrialPrivilegeData
	rightSource: number
	chargeInfoList: RawSongChargeInfo[]
}

export interface RawSongSearchData {
	name: string
	id: number
	pst: number
	t: number
	ar: RawArtistData[]
	alia: any[]
	pop: number
	st: number
	rt: any
	fee: number
	v: number
	crbt: any
	al: RawAlbumData
	dt: number
	h: RawQualityData
	m: RawQualityData
	l: RawQualityData
	sq: RawQualityData
	hr: RawQualityData
	a: any
	cd: any
	no: any
	rtUrl: any
	ftype: number
	rtUrls: any[]
	djId: number
	copyright: number
	s_id: number
	mark: number
	originCoverType: number
	originSongSimpleData: RawOriginSongSimpleData
	tagPicList: any
	resourceState: boolean
	version: number
	songJumpInfo: any
	entertainmentTags: any
	single: number
	noCopyrightRcmd: any
	rtype: number
	rurl: any
	mst: number
	cp: number
	mv: number
	publishTime: number
	tns?: any[]
	privilege: RawSongPrivilegeData
}

export interface RawSongData {
	id: number
	url: string | null
	br: number
	size: number
	md5: string | null
	code: number
	expi: number
	type: any
	gain: number
	peek: any
	fee: number
	uf: any
	payed: number
	flag: number
	canExtend: boolean
	freeTrialInfo: any
	level: any
	encodeType: any
	channelLayout: any
	freeTrialPrivilege: RawFreeTrialPrivilegeData
	freeTimeTrialPrivilege: RawFreeTimeTrialPrivilegeData
	urlSource: number
	rightSource: number
	podcastCtrp: any
	effectTypes: any
	time: number
}

export interface SongSimpleProfile {
	name: string
	fee: number
	alia?: any[]
	tns?: any[]
	publishTime: number
	version: number
}

export interface SongSearchData {
	id: number
	profile: SongSimpleProfile
	artists: RawArtistData[]
	album: RawAlbumData | null
	originSong: RawOriginSongSimpleData | null
	privilege: RawSongPrivilegeData
	$raw: RawSongSearchData
}

export interface SongData {
	id: number
	profile: SongSimpleProfile
	artists: RawArtistData[]
	album: RawAlbumData | null
	originSong: RawOriginSongSimpleData | null
	time: number
	expi: number
	source: {
		url: string | null
		md5: string | null
		size: number
		urlSource: number
		rightSource: number
	}
	privileges: {
		freeTrialPrivilege: RawFreeTrialPrivilegeData
		freeTimeTrialPrivilege: RawFreeTimeTrialPrivilegeData
	}
	$raw: RawSongData
}

export type LyricMetaData = {
	t: string
	c: {
		tx: string
		li?: string
		or?: string
	}[]
}
export type LyricParsedData = {
	timestamp: number
	text: string
}
