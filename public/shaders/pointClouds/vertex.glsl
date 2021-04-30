precision mediump float;

attribute vec3 position;
varying vec3 vColor;

uniform mat4 matrix;

void main() {
  vColor = vec3(position.xy, 1);
  gl_Position = matrix * vec4(position, 1);
  gl_PointSize = 1.0;
}