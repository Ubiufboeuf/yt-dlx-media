import { execFileSync } from 'node:child_process'
import type { FullResolution, Resolution, Stats } from '../types/mediaTypes'

export function getScale (sourceWidth: Resolution | number, sourceHeight: Resolution | number, targetWidth: Resolution | number, targetHeight: Resolution | number) {
  const sourcePixels = parseInt(String(sourceWidth)) * parseInt(String(sourceHeight))
  const targetPixels = parseInt(String(targetWidth)) * parseInt(String(targetHeight))

  if (sourcePixels <= 0 || targetPixels <= 0) {
    throw new Error('Resolución inválida')
  }

  return Math.min(1, Math.sqrt(targetPixels / sourcePixels))
}

export function getSourceStats (file: string): Stats {
  const output = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,bit_rate',
    '-of', 'json',
    file
  ], { encoding: 'utf8' })

  const data = JSON.parse(output)
  const stream = data.streams?.[0]

  if (!stream?.width || !stream?.height) {
    throw new Error('No se encontró un stream de video válido')
  }

  const bitrate = Number(stream.bit_rate)

  if (!Number.isFinite(bitrate) || bitrate <= 0) {
    throw new Error('No se pudo determinar el bitrate del stream de video')
  }

  const kbps = Math.max(1, Math.round(bitrate / 1000))

  return {
    resolution: {
      width: `${stream.width}p`,
      height: `${stream.height}p` as Resolution
    },
    bitrate: `${kbps}k`,
    maxrate: `${Math.round(kbps * 1.5)}k`,
    bufsize: `${kbps * 2}k`
  }
}

export function getFullResolution (target: Resolution, source: FullResolution): FullResolution {
  const sourceWidth = parseInt(source.width)
  const sourceHeight = parseInt(source.height)
  const targetHeight = parseInt(target)

  const aspectRatio = sourceWidth / sourceHeight
  const targetWidth = Math.round(targetHeight * aspectRatio / 2) * 2

  return {
    width: `${targetWidth}p`,
    height: target
  }
}
