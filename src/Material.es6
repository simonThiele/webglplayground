export default class Material {

  constructor(gl, vertexShaderSource, fragmentShaderSource) {
    this.gl = gl;

    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    this.program = this.createProgram(vertexShader, fragmentShader);
    this.addAttribute('position', 'aVertexPosition');
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

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");

    return shaderProgram;
  }

  addAttribute(key, shaderProperty) {
    const program = this.program;
    const gl = this.gl;

    program[key] = gl.getAttribLocation(program, shaderProperty);
    gl.enableVertexAttribArray(program[key]);
  }

  getProgram() {
    return this.program;
  }
}
