export type Resolution = '144p' | '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '2160p' | string & {}
export type FullResolution = { height: Resolution, width: Resolution }
export type Preset = {
  bitrate: string
  maxrate: string
  bufsize: string
}
export type Stats = {
  resolution: FullResolution
  bitrate: string
  maxrate: string
  bufsize: string
}
