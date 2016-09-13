import {COULD_NOT_FIND_ATTRIBUTE, log} from './Logger';

export default class Renderer {

  constructor(gl, width = 0, height = 0) {
    this.gl = gl;

    this.setSize(width, height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;

    this.gl.viewport(0, 0, width, height);
  }

  beginRender() {
    const gl = this.gl;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render(camera, object) {
    const gl = this.gl;

    this.setMaterial(object.material);
    this.binObjectBuffers(camera, object);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, object.geometry.attributes.position.numItems);
  }

  binObjectBuffers(camera, object) {
    const program = object.material.getProgram();
    const geometry = object.geometry;

    // set the uniform matrices inside each vertex shader
    this.gl.uniformMatrix4fv(program.pMatrixUniform, false, camera.getProjectionMatrix());
    this.gl.uniformMatrix4fv(program.mvMatrixUniform, false, object.getMatrix());

    const gl = this.gl;

    Object.keys(geometry.attributes).forEach(key => {
      const attribute = geometry.attributes[key];
      const programAttribute = this.getAttribute(program, key);
      if (programAttribute === undefined) {
        return;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
      gl.vertexAttribPointer(programAttribute,
                             attribute.itemSize,
                             gl.FLOAT,
                             false, // normalized
                             0,     // stride
                             0);    // offset
    });
  }

  getAttribute(object, key) {
    const attribute = object.attributes[key];
    if (attribute === undefined) {
      log(`${COULD_NOT_FIND_ATTRIBUTE} ${key}`);
    }
    return attribute;
  }

  setMaterial(material) {
    const gl = this.gl;
    const program = material.getProgram();

    gl.useProgram(program);

    Object.keys(program.attributes).forEach(key => {
      const attribute = this.getAttribute(program, key);
      if (attribute === undefined) {
        return;
      }
      gl.enableVertexAttribArray(attribute);
    });
  }
}
