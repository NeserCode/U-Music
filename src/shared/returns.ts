import { RawSongData, RawSongPrivilegeData, RawSongSearchData } from ".";

export interface BaseReturn {
	/** The request URL. */
	url: string;
	/** The response status code. */
	status: number;
	/** A boolean indicating whether the response was successful (status in the range 200–299) or not. */
	ok: boolean;
	/** The response headers. */
	headers: Record<string, string>;
	/** The response raw headers. */
	rawHeaders: Record<string, string[]>;
}

export interface CountriesCodeSimpleReturn {
	code: number;
	message: string;
	data: {
		countryList: {
			zh: string;
			en: string;
			code: string;
			locale: string;
		}[];
		label: string;
	}[];
}
export interface CountriesCodeReturn extends BaseReturn {
	data: CountriesCodeSimpleReturn;
}

export interface ArtistTopList {
	coverUrl: string;
	name: string;
	updateFrequency: string;
	position: number;
}
export interface TopList {
	subscribers: any[];
	subscribed: boolean;
	creator: any;
	artists: any;
	tracks: any;
	updateFrequency: string;
	backgroundCoverId: number;
	backgroundCoverUrl: any;
	titleImage: number;
	coverText: any;
	titleImageUrl: any;
	coverImageUrl: any;
	iconImageUrl: any;
	englishTitle: any;
	opRecommend: boolean;
	recommendInfo: any;
	socialPlaylistCover: any;
	tsSongCount: number;
	highQuality: boolean;
	specialType: number;
	coverImgId: number;
	newImported: boolean;
	anonimous: boolean;
	updateTime: number;
	coverImgUrl: string;
	trackCount: number;
	commentThreadId: string;
	trackUpdateTime: number;
	totalDuration: number;
	trackNumberUpdateTime: number;
	privacy: number;
	playCount: number;
	adType: number;
	subscribedCount: number;
	cloudTrackCount: number;
	createTime: number;
	ordered: boolean;
	description: string;
	status: number;
	tags: string[];
	userId: number;
	name: string;
	id: number;
	coverImgId_str: string;
	ToplistType: string;
}
export interface TopListSimpleReturn {
	code: number;
	list: TopList[];
	artistToplist: ArtistTopList[];
}
export interface TopListReturn extends BaseReturn {
	data: TopListSimpleReturn;
}

export interface PlayListCreatorOrSubscriber {
	accountStatus: number;
	anchor: boolean;
	authStatus: number;
	authenticationTypes: number;
	authority: number;
	avatarDetail: {
		identityIconUrl: string;
		identityLevel: number;
		userType: number;
	} | null;
	avatarImgId: number;
	avatarImgIdStr: string;
	avatarImgId_str: string;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundImgIdStr: string;
	backgroundUrl: string;
	birthday: number;
	city: number;
	defaultAvatar: boolean;
	description: string;
	detailDescription: string;
	djStatus: number;
	expertTags: any;
	experts: any;
	followed: boolean;
	gender: number;
	mutual: boolean;
	nickname: string;
	province: number;
	remarkName: any;
	signature: string;
	userId: number;
	userType: number;
	vipType: number;
}
export interface PlayListTrackID {
	alg: any;
	at: number;
	dpr: any;
	f: any;
	id: number;
	lr: number;
	rcmdReason: string;
	sc: any;
	sr: any;
	t: number;
	uid: number;
	v: number;
}
export interface PlayListDetail {
	TopListType: string;
	adType: number;
	algTags: any;
	backgroundCoverId: number;
	backgroundCoverUrl: any;
	bannedTrackIds: any;
	cloudTrackCount: number;
	commentCount: number;
	commentThreadId: string;
	copied: boolean;
	coverImgId: number;
	coverImgId_str: string;
	coverImgUrl: string;
	coverStatus: number;
	createTime: number;
	creator: PlayListCreatorOrSubscriber;
	description: string;
	detailPageTitle: any;
	displayTags: any;
	distributeTags: any;
	englishTitle: any;
	gradeStatus: string;
	highQuality: boolean;
	historySharedUsers: any;
	id: number;
	mvResourceInfos: any;
	name: string;
	newDetailPageRemixVideo: any;
	newImported: boolean;
	officialPlaylistType: any;
	opRecommend: boolean;
	ordered: boolean;
	playCount: number;
	privacy: number;
	relateResType: any;
	remixVideo: any;
	score: any;
	shareCount: number;
	specialType: number;
	status: number;
	subscribed: boolean;
	subscribedCount: number;
	subscribers: PlayListCreatorOrSubscriber[];
	tags: string[];
	titleImage: number;
	titleImageUrl: any;
	trackCount: number;
	trackIds: PlayListTrackID[];
	trackNumberUpdateTime: number;
	trackUpdateTime: number;
	tracks: RawSongSearchData[];
	trialMode: number;
	updateFrequency: any;
	updateTime: number;
	userId: number;
	videoIds: any;
	videos: any;
}
export interface PlayListSimpleReturn {
	code: number;
	fromUserCount: number;
	fromUsers: any;
	playlist: PlayListDetail;
	privileges: RawSongPrivilegeData[];
	relatedVideos: any;
	resEntrance: any;
	sharedPrivilege: any;
	songFromUsers: any;
	urls: any;
}
export interface PlayListReturn extends BaseReturn {
	data: PlayListSimpleReturn;
}

export interface SongResourceReturn extends BaseReturn {
	data: RawSongData[];
}

export interface SongSearchReturn {
	result: {
		searchQcReminder: any;
		songs: RawSongSearchData[];
		songCount: number;
	};
	code: number;
}

export type LyricMeta = {
	version: number;
	lyric: string;
}
export interface LyricSimpleReturn {
	sgc: boolean;
	sfy: boolean;
	qfy: boolean;
	lrc: LyricMeta;
	klyric: LyricMeta;
	tlyric: LyricMeta;
	romalrc: LyricMeta;
	code: number;
}
export interface LyricReturn extends BaseReturn {
	data: LyricSimpleReturn;
}
