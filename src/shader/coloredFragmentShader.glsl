precision mediump float;

varying vec3 vVertexColor;


void main(void) {
  gl_FragColor = vec4(vVertexColor, 1.0);
}
