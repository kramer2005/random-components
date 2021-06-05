import Box from './Components/Box'
import { mat4 } from 'gl-matrix'
import { RenderingComponent } from './types'

let fpsElement: HTMLParagraphElement
let lastTime = 0
const elements: RenderingComponent[] = []
const projectionMatrix = mat4.create()
const viewMatrix = mat4.create()
let count = 0

let gl: WebGLRenderingContext

const animate = (time: number): void => {
  requestAnimationFrame(animate)

  if (count++ % 10 === 0) {
    elements.push(new Box(gl))
  }

  elements.forEach(el => el.update(viewMatrix, projectionMatrix))
  fpsElement.innerHTML = Math.round(1000 / (time - lastTime)).toString()
  lastTime = time
}

const SetupScene = (
  canvas: HTMLCanvasElement,
  fps: HTMLParagraphElement
): void => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  gl = canvas.getContext('webgl') as WebGLRenderingContext
  fpsElement = fps

  if (!gl) {
    throw new Error('WebGL not supported')
  }

  gl.viewport(0, 0, canvas.width, canvas.height)
  mat4.perspective(
    projectionMatrix,
    (70 * Math.PI) / 180,
    canvas.width / canvas.height,
    1e-4,
    Infinity
  )

  mat4.translate(viewMatrix, viewMatrix, [0, 0, 5])
  mat4.invert(viewMatrix, viewMatrix)
  elements.push(new Box(gl))

  animate(0)
}

export default SetupScene
