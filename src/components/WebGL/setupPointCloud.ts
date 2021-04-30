import { mat4, ReadonlyVec3, vec3 } from 'gl-matrix'
let gl: WebGLRenderingContext
let uniformLocations: { matrix: WebGLUniformLocation | null }
let modelMatrix: mat4
let viewMatrix: mat4
let projectionMatrix: mat4
let mvMatrix: mat4
let mvpMatrix: mat4
let fpsParagraph: HTMLParagraphElement
let lastTime = 0
let animationCount = 0
let actualFunction: () => void
let distance = 1

const totalPoints = 10000

// const randomColor = () => [Math.random(), Math.random(), Math.random()]

export const aproximateCamera = (): void => {
  actualFunction = () => {
    if (distance > 1) {
      mat4.translate(viewMatrix, viewMatrix, [0, 0, 0.1])
      distance -= 0.1
    }
  }
  animationCount = 10
}

export const distanceCamera = (): void => {
  actualFunction = () => {
    if (distance < 5) {
      mat4.translate(viewMatrix, viewMatrix, [0, 0, -0.1])
      distance += 0.1
    }
  }
  animationCount = 10
}

export const resize = (canvas: HTMLCanvasElement): void => {
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

const render = (time: number) => {
  requestAnimationFrame(render)
  mat4.rotateY(modelMatrix, modelMatrix, Math.PI / 3 / 100)
  mat4.rotateX(modelMatrix, modelMatrix, Math.PI / 3 / 100)

  mat4.multiply(mvMatrix, viewMatrix, modelMatrix)
  mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix)

  if (animationCount-- > 0) {
    actualFunction()
  }

  gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix)
  gl.drawArrays(gl.POINTS, 0, totalPoints)
  fpsParagraph.innerHTML =
    Math.round(1000 / (time - lastTime)).toString() + ' FPS'
  lastTime = time
}

const spherePointCloud = (pointCount: number) => {
  const points = []
  for (let i = 0; i < pointCount; i++) {
    const r = () => Math.random() - 0.5

    const inputPoint = [r(), r(), r()] as ReadonlyVec3
    const outputPoint = vec3.normalize(vec3.create(), inputPoint)

    points.push(...outputPoint)
  }
  return points
}

export default async (
  canvas: HTMLCanvasElement,
  fps: HTMLParagraphElement
): Promise<void> => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  fpsParagraph = fps
  gl = canvas.getContext('webgl') as WebGLRenderingContext

  if (!gl) {
    throw new Error('Unsupported WebGL')
  }

  gl.viewport(0, 0, canvas.width, canvas.height)

  // Create Vertex data
  const vertexData = spherePointCloud(totalPoints)

  // Create vertex buffer
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)

  // Create Vertex Shader
  const vertexShaderFile = await fetch('/shaders/pointClouds/vertex.glsl')
  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
  gl.shaderSource(vertexShader, await vertexShaderFile.text())
  gl.compileShader(vertexShader)

  // Create Fragment Shader
  const fragmentShaderFile = await fetch('/shaders/pointClouds/fragment.glsl')
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
  gl.shaderSource(fragmentShader, await fragmentShaderFile.text())
  gl.compileShader(fragmentShader)

  // Create program
  const program = gl.createProgram() as WebGLProgram

  // Attach shaders to program
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)

  // Enable vertex attributes
  const positionLocation = gl.getAttribLocation(program, 'position')
  gl.enableVertexAttribArray(positionLocation)
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

  // Draw
  gl.useProgram(program)
  gl.enable(gl.DEPTH_TEST)

  // Get Matrix
  uniformLocations = {
    matrix: gl.getUniformLocation(program, 'matrix')
  }

  modelMatrix = mat4.create()
  viewMatrix = mat4.create()
  projectionMatrix = mat4.create()
  mvMatrix = mat4.create()
  mvpMatrix = mat4.create()

  mat4.perspective(
    projectionMatrix,
    (70 * Math.PI) / 180,
    canvas.width / canvas.height,
    1e-4,
    Infinity
  )

  // Operations in matrix
  mat4.translate(modelMatrix, modelMatrix, [0, 0, 0])
  mat4.translate(projectionMatrix, projectionMatrix, [0, 0, 0])
  mat4.translate(viewMatrix, viewMatrix, [0, 0, distance])
  mat4.invert(viewMatrix, viewMatrix)

  render(0)
}
