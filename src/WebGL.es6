import Attribute from './Attribute';
import Renderer from './Renderer';
import Object3D from './Object3D';
import Geometry from './Geometry';
import Material from './Material';

import {COULD_NOT_CREATE_WEBGL, SUCCESSFULLY_CREATE_WEBGL, log} from './Logger';

export default class WebGL {

  constructor(canvas) {
    this.gl = this.getWebGLCanvasContext(canvas);
    if (!this.gl) {
      log(`${COULD_NOT_CREATE_WEBGL} ${canvas}`);
      return;
    }
    log(SUCCESSFULLY_CREATE_WEBGL);
  }

  // https://www.khronos.org/webgl/wiki/FAQ
  // it is recommended that you check for success or failure to initialize.
  // if WebGL fails to initialize it is recommended you distinguish between failure
  // because the browser doesn't support WebGL and failure for some other reason.
  // if the browser does not support WebGL then the map will not be rendered.
  // you can determine if the browser supports WebGL by checking for the existence of WebGLRenderingContext.
  getWebGLCanvasContext(canvas) {
    const names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
    let context = null;
    for (let ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii]);
      } catch (e) {
        continue;
      }
      if (context) {
        break;
      }
    }
    return context;
  }

  createRenderer(width, height) {
    return new Renderer(this.gl, width, height);
  }

  createMaterial(vertexShaderSource, fragmentShaderSource) {
    return new Material(this.gl, vertexShaderSource, fragmentShaderSource);
  }

  createGeometry() {
    return new Geometry(this.gl);
  }

  createObject3D(geometry, material) {
    return new Object3D(geometry, material);
  }

  createAttribute(id, data, itemSize) {
    return new Attribute(this.gl, id, data, itemSize);
  }

  getShader(shaderFileName) {
    return require('./shader/' + shaderFileName + '.glsl');
  }

  dispose() {}
}
