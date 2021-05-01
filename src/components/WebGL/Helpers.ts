import { mat4 } from 'gl-matrix'

export const loadText = async (path: string): Promise<string> => {
  const shader = await fetch(path)
  return shader.text()
}

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  projectionMatrix: mat4
): void => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  gl.viewport(0, 0, canvas.width, canvas.height)
  mat4.perspective(
    projectionMatrix,
    (70 * Math.PI) / 180,
    canvas.width / canvas.height,
    1e-4,
    Infinity
  )
}
