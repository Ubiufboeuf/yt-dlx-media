import type { Preset, Resolution } from '../types/mediaTypes'

export const VIDEO_BITRATE_PRESETS: Record<Resolution, Preset> = {
  '144p': { bitrate: '150k', bufsize: '300k', maxrate: '225k' },
  '240p': { bitrate: '350k', bufsize: '700k', maxrate: '525k' },
  '360p': { bitrate: '800k', bufsize: '1600k', maxrate: '1200k' },
  '480p': { bitrate: '1400k', bufsize: '2800k', maxrate: '2100k' },
  '720p': { bitrate: '2800k', bufsize: '5600k', maxrate: '4200k' },
  '1080p': { bitrate: '5000k', bufsize: '10000k', maxrate: '7500k' },
  '1440p': { bitrate: '10000k', bufsize: '20000k', maxrate: '15000k' },
  '2160p': { bitrate: '22000k', bufsize: '44000k', maxrate: '33000k' }
}
