uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;

varying vec3 vVertexColor;


void main(void) {
  vVertexColor = aVertexColor;

  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}
