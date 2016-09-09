import {mat4} from 'gl-matrix';

export default class Renderer {

  constructor(gl) {
    this.gl = gl;

    this.setSize(0, 0);

    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;

    mat4.perspective(45, width / height, 0.1, 100.0, this.pMatrix);
  }

  render(geometry, material) {
    const gl = this.gl;

    gl.viewport(0, 0, this.width, this.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.identity(this.mvMatrix);

    const program = material.getProgram();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute,
                           geometry.vertexPositionBuffer.itemSize,
                           gl.FLOAT,
                           false, // normalized
                           0,     // stride
                           0);    // offset

    // set the uniform matrices inside each vertex shader
    this.gl.uniformMatrix4fv(program.pMatrixUniform, false, this.pMatrix);
    this.gl.uniformMatrix4fv(program.mvMatrixUniform, false, this.mvMatrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
