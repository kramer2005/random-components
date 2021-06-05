import { mat4 } from 'gl-matrix'
import { type } from 'os'

export type RenderingComponent = {
  _gl: WebGLRenderingContext

  modelMatrix: mat4
  mvMatrix: mat4
  mvpMatrix: mat4

  vertexShader: () => WebGLShader
  fragmentShader: () => WebGLShader

  update: (viewMatrix: mat4, projectionMatrix: mat4) => void
}
