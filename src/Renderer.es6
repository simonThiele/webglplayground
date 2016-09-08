import {getWebGLCanvasContext} from './WebGL';
import Material from './Material';
import Geometry from './Geometry';
import {mat4} from 'gl-matrix';

export default class Renderer {

  constructor(canvas) {
    const e = this.initGL(canvas);
    if (!this.gl) {
      console.log(e);
      return;
    }
    console.log('renderer v 0.0.1');

    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();

    this.material = new Material(this.gl);

    this.geometry = new Geometry(this.gl);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.draw();

    this.geometry.dispose();
  }

  initGL(canvas) {
    try {
      this.gl = getWebGLCanvasContext(canvas);
      this.gl.viewportWidth = canvas.width;
      this.gl.viewportHeight = canvas.height;
    } catch (e) {
      return e;
    }
  }

  setMatrixUniforms(shaderProgram) {
    this.gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, this.pMatrix);
    this.gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, this.mvMatrix);
  }

  draw() {
    const gl = this.gl;

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, this.pMatrix);
    mat4.identity(this.mvMatrix);

    const program = this.material.getProgram();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.geometry.vertexPositionBuffer);
    gl.vertexAttribPointer(program.vertexPositionAttribute,
                           this.geometry.vertexPositionBuffer.itemSize,
                           gl.FLOAT,
                           false,
                           0,
                           0);

    this.setMatrixUniforms(program);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}
