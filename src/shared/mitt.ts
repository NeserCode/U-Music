import { LyricParsedData } from "./song";

export interface MittHttpBaseParams {
  fullPath: string;
  path?: string;
}
export interface MittHttpReqParams extends MittHttpBaseParams {
  params?: Record<string, string>;
}
export interface MittHttpResParams extends MittHttpBaseParams {
  status: number;
  data?: any;
}

export interface MittSongEventBaseParams {
  id: number;
}
export interface MittSongStateParams extends MittSongEventBaseParams {
  title?: string;
  artist?: string;
  image?: string;

  lyric?: LyricParsedData[];
}
export interface MittSongRuntimeParams extends MittSongEventBaseParams {
  playing: boolean;
  mute: boolean;
  volume: number;
  url: string;
  duration: number;
  current: number;
}
export interface MittAudioTimeUpdateParams {
  duration: number;
  current: number;

  buffered: TimeRanges;
}

export type MittEvent = {
  "app-mounted": void;

  "title-set": string;
  "scrollbar-init": void;
  "dynamic-content-init": void;
  "http-request-init": MittHttpReqParams;
  "http-request-pending": MittHttpReqParams;
  "http-response": MittHttpResParams;

  "song-switch": MittSongStateParams;
  "song-play": MittSongRuntimeParams;
  "song-uniquify": void;
  "song-lyric-active": number;
  "song-change-time": number;

  "audio:canplaythrough": void;
  "audio:play": void;
  "audio:pause": void;
  "audio:ended": void;
  "audio:time-change": number;
  "audio:time-update": MittAudioTimeUpdateParams;
  "audio:volume-change": number;
  "audio:mute-change": boolean;
  "audio:loop-change": boolean;
};
