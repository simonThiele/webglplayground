export default class Geometry {

  constructor(gl) {
    this.gl = gl;

    this.attributes = {};
  }

  addAttribute(attribute) {
    this.attributes[attribute.id] = attribute;
  }

  dispose() {
    this.gl.deleteBuffer(this.vertexPositionBuffer);
  }
}
