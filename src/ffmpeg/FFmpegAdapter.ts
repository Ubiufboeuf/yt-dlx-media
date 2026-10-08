import { stat } from 'node:fs/promises'
import { VIDEO_BITRATE_PRESETS } from '../lib/constants'
import { asyncSubprocess } from '../lib/subprocess'
import type { Resolution } from '../types/mediaTypes'
import type { MediaProcessor, NormalizeOptions, NormalizeResult, ProcessorOptions, ProcessorResult } from '../types/processorTypes'
import { join, resolve } from 'node:path'

export class FFmpegAdapter implements MediaProcessor {
  private binaryPath: string

  constructor (binaryPath = 'ffmpeg') {
    this.binaryPath = binaryPath
  }

  async mux (outputPath: string, videos: string[], audios: string[], options?: ProcessorOptions): Promise<ProcessorResult> {
    const args: string[] = [options?.overrideResult ? '-y' : '-n']
    
    videos.forEach((v) => args.push('-i', v))
    audios.forEach((a) => args.push('-i', a))

    for (let i = 0; i < videos.length; i++) args.push('-map', `${i}:v:0`)
    for (let i = 0; i < audios.length; i++) args.push('-map', `${videos.length + i}:a:0`)

    if (options?.codec) args.push('-c', options.codec)
    if (options?.vcodec) args.push('-c:v', options.vcodec)
    if (options?.acodec) args.push('-c:a', options.acodec)

    args.push(outputPath)

    const result = await asyncSubprocess(this.binaryPath, args, options)

    if (result.type === 'error') {
      throw result.error
    }

    return {
      filePath: resolve(outputPath)
    }
  }

  async normalize (inputFile: string, outputDir: string, resolutions: Resolution[], options?: NormalizeOptions): Promise<NormalizeResult> {
    const vcodec = options?.vcodec ?? 'libx264'
    const args = [options?.overrideResult ? '-y' : '-n', '-i', inputFile]

    resolutions.forEach((res) => {
      const { bitrate, maxrate, bufsize } = VIDEO_BITRATE_PRESETS[res]
      const height = Number.parseInt(res, 10)
      const audioMap = options?.keepAudio
        ? ['-map', '0:a?', '-c:a', 'copy']
        : ['-an']

      args.push(
        '-map', '0:v', ...audioMap,
        '-c:v', vcodec, '-vf', `scale=w=-2:h=${height}`,
        '-b:v', bitrate, '-maxrate', maxrate, '-bufsize', bufsize,
        '-g', '48', '-keyint_min', '48', '-sc_threshold', '0',
        '-f', 'mp4', `${outputDir}/${res}.mp4`
      )
    })

    const result = await asyncSubprocess(this.binaryPath, args, options)

    if (result.type === 'error') {
      throw result.error
    }

    const outputFiles = resolutions.map((res) => join(outputDir, `${res}.mp4`))
    const existingFiles: string[] = []

    for (const file of outputFiles) {
      try {
        const info = await stat(file)
        if (info.isFile() && info.size > 0) existingFiles.push(resolve(file))
      } catch {/* empty */}
    }

    return { outputFiles: existingFiles }
  }
}
