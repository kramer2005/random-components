import { mat4 } from 'gl-matrix'
import { RenderingComponent } from '../types'
import vertexData from './vertexData.json'

class Box implements RenderingComponent {
  _gl: WebGLRenderingContext

  uniformLocations: {
    matrix: WebGLUniformLocation | null
    textureID: WebGLUniformLocation | null
  }

  modelMatrix = mat4.create()
  mvMatrix = mat4.create()
  mvpMatrix = mat4.create()
  program: WebGLProgram
  uvData = [
    1,
    1, // top right
    1,
    0, // bottom right
    0,
    1, // top left

    0,
    1, // top left
    1,
    0, // bottom right
    0,
    0 // bottom left
  ]

  private randomColor = () => [Math.random(), Math.random(), Math.random()]

  constructor(gl: WebGLRenderingContext) {
    this._gl = gl
    this.program = gl.createProgram() as WebGLProgram

    this.loadTexture()

    gl.attachShader(this.program, this.vertexShader())
    gl.attachShader(this.program, this.fragmentShader())
    gl.linkProgram(this.program)

    const positionLocation = gl.getAttribLocation(this.program, 'position')
    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer())
    gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

    const uvLocation = gl.getAttribLocation(this.program, 'uv')
    gl.enableVertexAttribArray(uvLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer())
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0)

    gl.useProgram(this.program)
    gl.enable(gl.DEPTH_TEST)

    this.uniformLocations = {
      matrix: gl.getUniformLocation(this.program, 'matrix'),
      textureID: gl.getUniformLocation(this.program, 'textureID')
    }

    gl.uniform1i(this.uniformLocations.textureID, 0)
  }

  loadTexture(): WebGLTexture {
    const texture = this._gl.createTexture() as WebGLTexture
    const image = new Image()

    image.onload = () => {
      this._gl.bindTexture(this._gl.TEXTURE_2D, texture)

      this._gl.texImage2D(
        this._gl.TEXTURE_2D,
        0,
        this._gl.RGBA,
        this._gl.RGBA,
        this._gl.UNSIGNED_BYTE,
        image
      )

      this._gl.generateMipmap(this._gl.TEXTURE_2D)
    }

    image.src = 'sprites/brick.png'

    this._gl.activeTexture(this._gl.TEXTURE0)
    this._gl.bindTexture(this._gl.TEXTURE_2D, texture)

    this.loadTexture = () => texture

    return texture
  }

  vertexBuffer(): WebGLBuffer {
    const vertexBuffer = this._gl.createBuffer() as WebGLBuffer
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertexBuffer)
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array(vertexData),
      this._gl.STATIC_DRAW
    )

    return vertexBuffer
  }

  vertexShader(): WebGLShader {
    const vertexShader = this._gl.createShader(
      this._gl.VERTEX_SHADER
    ) as WebGLShader
    this._gl.shaderSource(
      vertexShader,
      `
      precision mediump float;
      attribute vec3 position;
      attribute vec2 uv;
      varying vec2 vUV;
      uniform mat4 matrix;
      void main() {
          vUV = uv;
          gl_Position = matrix * vec4(position, 1);
      }
    `
    )
    this._gl.compileShader(vertexShader)

    return vertexShader
  }

  fragmentShader(): WebGLShader {
    const fragmentShader = this._gl.createShader(
      this._gl.FRAGMENT_SHADER
    ) as WebGLShader
    this._gl.shaderSource(
      fragmentShader,
      `
      precision mediump float;
      varying vec2 vUV;
      uniform sampler2D textureID;
      void main() {
          gl_FragColor = texture2D(textureID, vUV);
      }
    `
    )
    this._gl.compileShader(fragmentShader)

    return fragmentShader
  }

  uvBuffer(): WebGLBuffer {
    const uvBuffer = this._gl.createBuffer() as WebGLBuffer
    this._gl.bindBuffer(this._gl.ARRAY_BUFFER, uvBuffer)
    this._gl.bufferData(
      this._gl.ARRAY_BUFFER,
      new Float32Array(this.uvData),
      this._gl.STATIC_DRAW
    )

    return uvBuffer
  }

  update(viewMatrix: mat4, projectionMatrix: mat4): void {
    this._gl.useProgram(this.program)

    mat4.translate(this.modelMatrix, this.modelMatrix, [0.1, 0, 0])

    mat4.multiply(this.mvMatrix, viewMatrix, this.modelMatrix)
    mat4.multiply(this.mvpMatrix, projectionMatrix, this.mvMatrix)

    this._gl.useProgram(this.program)
    this._gl.uniformMatrix4fv(
      this.uniformLocations.matrix,
      false,
      this.mvpMatrix
    )

    this._gl.drawArrays(this._gl.TRIANGLES, 0, 6)
  }
}

export default Box
