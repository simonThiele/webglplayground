import basicFragmentShader from './fragmentShader.glsl';
import basicVertexShader from './vertexShader.glsl';

import {getWebGLCanvasContext} from './WebGL';

export default class Renderer {

  constructor(canvas) {
    const e = this.initGL(canvas);
    if (!this.gl) {
      console.log(e);
      return;
    }
    console.log('renderer v 0.0.1');

    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, basicVertexShader);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, basicFragmentShader);

    const vertexPositionAttribute = this.createProgram(vertexShader, fragmentShader);

    const vertexPositionBuffer = this.createBuffer();

    this.draw(vertexPositionBuffer, vertexPositionAttribute);

    this.deleteBuffer(vertexPositionBuffer);
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

  createShader(type, source) {
    const gl = this.gl;

    const shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  }

  createProgram(vertexShader, fragmentShader) {
    const gl = this.gl;

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log("Could not initialise shaders");
      return null;
    }

    gl.useProgram(shaderProgram);

    const vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    return vertexPositionAttribute;
  }

  createBuffer() {
    const gl = this.gl;

    const vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    const vertices = [
      0.5, 0.5,
      -0.5, 0.5,
      0.5, -0.5,
      -0.5, -0.5
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 2;
    vertexPositionBuffer.numItems = 4;

    return vertexPositionBuffer;
  }

  draw(vertexPositionBuffer, vertexPositionAttribute) {
    const gl = this.gl;

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  deleteBuffer(buffer) {
    this.gl.deleteBuffer(buffer);
  }
}
