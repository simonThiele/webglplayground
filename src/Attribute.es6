export default class Attribute {

  constructor(gl, id, data, itemSize) {
    this.id = id;
    this.gl = gl;

    this.update(data, itemSize);
  }

  update(data, itemSize = this.itemSize) {
    this.itemSize = itemSize;
    this.numItems = data.length / itemSize;

    if (!(data instanceof Float32Array)) {
      data = new Float32Array(data);
    }
    this.buffer = this.createBuffer(this.gl, data);
  }

  createBuffer(gl, data) {
    const vertexPositionBuffer = gl.createBuffer();
    vertexPositionBuffer.itemSize = this.itemSize;
    vertexPositionBuffer.numItems = 4;

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return vertexPositionBuffer;
  }
}
