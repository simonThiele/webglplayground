import basicFragmentShader from './fragmentShader.glsl';
import basicVertexShader from './vertexShader.glsl';

export default class Material {

  constructor(gl) {
    this.gl = gl;

    const vertexShader = this.createShader(gl.VERTEX_SHADER, basicVertexShader);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, basicFragmentShader);

    this.program = this.createProgram(vertexShader, fragmentShader);
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

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

    return shaderProgram;
  }

  getProgram() {
    return this.program;
  }
}
