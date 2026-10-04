import { asyncSubprocess } from '../lib/subprocess'
import type { MediaProcessor, ProcessorOptions, ProcessorResult } from '../types/processorTypes'
import { resolve } from 'node:path'

export class FFmpegAdapter implements MediaProcessor {
  private binaryPath: string

  constructor (binaryPath = 'ffmpeg') {
    this.binaryPath = binaryPath
  }

  async mux (outputPath: string, videos: string[], audios: string[], options?: ProcessorOptions): Promise<ProcessorResult> {
    const args: string[] = [options?.overrideResult ? '-y' : '-n']
    
    videos.forEach((v) => args.push('-i', v))
    audios.forEach((a) => args.push('-i', a))

    args.push(outputPath)

    const result = await asyncSubprocess(this.binaryPath, args, options)

    if (result.type === 'error') {
      throw result.error
    }

    return {
      filePath: resolve(outputPath)
    }
  }
}
