import type { MediaProcessor, ProcessorOptions } from '../types/processorTypes'

export type MediaEngineConfig = { adapter: MediaProcessor }

export class MediaEngine {
  private readonly processor: MediaProcessor

  constructor (config: MediaEngineConfig) {
    this.processor = config.adapter
  }

  async mux (outputPath: string, videos: string[], audios: string[], options?: ProcessorOptions) {
    const result = this.processor.mux(outputPath, videos, audios, options)
    return result
  }
}
