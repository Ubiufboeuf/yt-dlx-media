import type { Resolution } from '../types/mediaTypes'
import type { MediaProcessor, NormalizeOptions, ProcessorOptions } from '../types/processorTypes'

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

  async normalize (inputFile: string, outputDir: string, resolutions: Resolution[], options?: NormalizeOptions) {
    const result = this.processor.normalize(inputFile, outputDir, resolutions, options)
    return result
  }
}
