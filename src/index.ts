// 1. Bajo nivel
// 1.a. Subprocess
export { asyncSubprocess, cleanSubprocessOutput } from './lib/subprocess'
export type * from './types/subprocessTypes'

// 2. Adaptadores
// 2.a. FFmpeg: Adaptador, tipos y constantes
export { FFmpegAdapter } from './ffmpeg/FFmpegAdapter'
// export {  } from './ffmpeg/ffmpegTypes'
// export type * from './ffmpeg/ffmpegTypes'

// 3. Engines - Tareas
export { MediaEngine, type MediaEngineConfig } from './engines/MediaEngine'

// 4. Otros
export { SubprocessError, type SubprocessErrorData } from './errors/SubprocessError'
export type * from './types/processorTypes'
