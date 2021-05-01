import { mat4 } from 'gl-matrix'
import Box from './Components/Box'

let fpsElement: HTMLParagraphElement
let lastTime = 0
const projectionMatrix = mat4.create()
const viewMatrix = mat4.create()

const animate = (time: number): void => {
  requestAnimationFrame(animate)
  fpsElement.innerHTML = Math.round(1000 / (time - lastTime)).toString()
  lastTime = time
}

const SetupScene = (
  canvas: HTMLCanvasElement,
  fps: HTMLParagraphElement
): void => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const gl = canvas.getContext('webgl')
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

  const box = new Box(gl, 2, projectionMatrix, viewMatrix)
  const box2 = new Box(gl, -2, projectionMatrix, viewMatrix)

  animate(0)
}

export default SetupScene
