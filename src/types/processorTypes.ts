import type { SubprocessOptions } from './subprocessTypes'

export interface ProcessorOptions extends SubprocessOptions {
  outputDir?: string
  overrideResult?: boolean
  codec?: 'copy' | string & {}
  vcodec?: 'copy' | string & {}
  acodec?: 'copy' | string & {}
}

export interface ProcessorResult {
  filePath?: string
}

export interface MediaProcessor {
  mux (outputPath: string, videos: string[], audios: string[], options?: ProcessorOptions): Promise<ProcessorResult>
}
