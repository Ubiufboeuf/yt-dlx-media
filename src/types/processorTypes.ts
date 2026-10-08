import type { Resolution } from './mediaTypes'
import type { SubprocessOptions } from './subprocessTypes'

export interface ProcessorOptions extends SubprocessOptions {
  outputDir?: string
  overrideResult?: boolean
  codec?: 'copy' | string & {}
  vcodec?: 'copy' | string & {}
  acodec?: 'copy' | string & {}
}

export interface NormalizeOptions extends SubprocessOptions {
  overrideResult?: boolean
  vcodec?: 'libx264' | string & {}
  keepAudio?: boolean
}

export interface ProcessorResult {
  filePath?: string
}

export interface NormalizeResult {
  outputFiles: string[]
}

export interface MediaProcessor {
  mux (outputPath: string, videos: string[], audios: string[], options?: ProcessorOptions): Promise<ProcessorResult>
  normalize (inputFile: string, outputDir: string, resolutions: Resolution[], options?: NormalizeOptions): Promise<NormalizeResult>
}
