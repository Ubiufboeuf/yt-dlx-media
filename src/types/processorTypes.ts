import type { SubprocessOptions } from './subprocessTypes'

export interface ProcessorOptions extends SubprocessOptions {
  outputDir?: string
  overrideResult?: boolean
}

export interface ProcessorResult {
  filePath?: string
}

export interface MediaProcessor {
  mux (outputPath: string, videos: string[], audios: string[], options?: ProcessorOptions): Promise<ProcessorResult>
}
