export default class Attribute {

  constructor(gl, id, data, itemSize) {
    this.id = id;
    this.gl = gl;
    this.arrayType = gl.ARRAY_BUFFER;

    if (id === 'index') {
      this.arrayType = gl.ELEMENT_ARRAY_BUFFER;
    }

    this.update(data, itemSize);
  }

  update(data, itemSize = this.itemSize) {
    this.itemSize = itemSize;
    this.numItems = data.length / itemSize;

    if (this.id === 'index') {
      if (!(data instanceof Uint16Array)) {
        data = new Uint16Array(data);
      }
    } else if (!(data instanceof Float32Array)) {
      data = new Float32Array(data);
    }
    this.buffer = this.createBuffer(this.gl, data);
    this.buffer.numItems = data.length;
  }

  createBuffer(gl, data) {
    const vertexPositionBuffer = gl.createBuffer();

    gl.bindBuffer(this.arrayType, vertexPositionBuffer);
    gl.bufferData(this.arrayType, data, gl.STATIC_DRAW);

    return vertexPositionBuffer;
  }
}
