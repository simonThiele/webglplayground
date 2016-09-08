export default class Geometry {

  constructor(gl) {
    this.gl = gl;

    this.vertexPositionBuffer = this.createBuffer();
  }

  createBuffer() {
    const gl = this.gl;

    const vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    const vertices = [
      0.5, 0.5, 0,
      -0.5, 0.5, 0,
      0.5, -0.5, 0,
      -0.5, -0.5, 0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = 4;

    return vertexPositionBuffer;
  }

  dispose() {
    this.gl.deleteBuffer(this.vertexPositionBuffer);
  }
}
