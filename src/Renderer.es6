import {mat4} from 'gl-matrix';

export default class Renderer {

  constructor(gl) {
    this.gl = gl;

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, this.pMatrix);

    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  render(geometry, material) {
    const gl = this.gl;

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.identity(this.mvMatrix);

    const program = material.getProgram();
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.vertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute,
                           geometry.vertexPositionBuffer.itemSize,
                           gl.FLOAT,
                           false,
                           0,
                           0);

    // set the uniform matrices inside each vertex shader
    this.gl.uniformMatrix4fv(program.pMatrixUniform, false, this.pMatrix);
    this.gl.uniformMatrix4fv(program.mvMatrixUniform, false, this.mvMatrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
