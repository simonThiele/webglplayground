export default class Attribute {

  constructor(gl, id, data, itemSize) {
    this.id = id;
    this.gl = gl;
    this.itemSize = itemSize;

    if (!(data instanceof Float32Array)) {
      data = new Float32Array(data);
    }
    this.numItems = data.length / itemSize;

    this.buffer = this.createBuffer(gl, data);
  }

  createBuffer(gl, data) {

    const vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = this.itemSize;
    vertexPositionBuffer.numItems = 4;

    return vertexPositionBuffer;
  }
}
