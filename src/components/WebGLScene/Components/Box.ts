import { mat4 } from 'gl-matrix'

class Box {
  private gl

  private vertexBuffer: WebGLBuffer
  private colorBuffer: WebGLBuffer

  private vertexShader: WebGLShader
  private fragmentShader: WebGLShader

  private vertexData = [
    // Front
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,

    // Left
    -0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    -0.5,

    // Back
    -0.5,
    0.5,
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,

    // Right
    0.5,
    0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,

    // Top
    0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    0.5,
    0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,

    // Bottom
    0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    0.5,
    -0.5,
    -0.5,
    0.5,
    0.5,
    -0.5,
    -0.5,
    -0.5,
    -0.5,
    -0.5
  ]

  private colorData: number[] = []
  constructor(
    gl: WebGLRenderingContext,
    offsetX: number,
    projectionMatrix: mat4,
    viewMatrix: mat4
  ) {
    this.gl = gl
    // Color data
    for (let face = 0; face < 6; face++) {
      const faceColor = Box.randomColor()
      for (let vertex = 0; vertex < 6; vertex++) {
        this.colorData.push(...faceColor)
      }
    }

    // Vertex buffer
    this.vertexBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.vertexData),
      gl.STATIC_DRAW
    )

    // Color buffer
    this.colorBuffer = gl.createBuffer() as WebGLBuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(this.colorData),
      gl.STATIC_DRAW
    )

    // Vertex Shader
    this.vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
    gl.shaderSource(
      this.vertexShader,
      `
      precision mediump float;

      attribute vec3 position;
      attribute vec3 color;
      varying vec3 vColor;

      uniform mat4 matrix;

      void main() {
        vColor = color;
        gl_Position = matrix * vec4(position, 1);
      }
    `
    )
    gl.compileShader(this.vertexShader)

    // Create Fragment Shader
    this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
    gl.shaderSource(
      this.fragmentShader,
      `
      precision mediump float;
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1);
      }
    `
    )
    gl.compileShader(this.fragmentShader)

    const program = gl.createProgram() as WebGLProgram

    // Attach shaders to program
    gl.attachShader(program, this.vertexShader)
    gl.attachShader(program, this.fragmentShader)
    gl.linkProgram(program)

    // Enable vertex attributes
    const positionLocation = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

    // Enable color attributes
    const colorLocation = gl.getAttribLocation(program, 'color')
    gl.enableVertexAttribArray(colorLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer)
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)

    // Draw
    gl.useProgram(program)
    gl.enable(gl.DEPTH_TEST)

    const matrix = gl.getUniformLocation(program, 'matrix')
    const modelMatrix = mat4.create()
    const mvMatrix = mat4.create()
    const mvpMatrix = mat4.create()
    mat4.translate(modelMatrix, modelMatrix, [offsetX, 0, 0])

    mat4.multiply(mvMatrix, viewMatrix, modelMatrix)
    mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix)

    gl.uniformMatrix4fv(matrix, false, mvpMatrix)

    gl.drawArrays(gl.TRIANGLES, 0, 36)
  }

  static randomColor = (): number[] => [
    Math.random(),
    Math.random(),
    Math.random()
  ]
}

export default Box
