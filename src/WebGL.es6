import Renderer from './Renderer';
import Geometry from './Geometry';
import Material from './Material';

export default class WebGL {

  constructor(canvas) {
    this.gl = this.getWebGLCanvasContext(canvas);
    if (!this.gl) {
      console.log('could not create webGL context for', canvas);
      return;
    }
    console.log('webglplayground v 0.0.1');
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

  createRenderer() {
    return new Renderer(this.gl);
  }

  createMaterial() {
    return new Material(this.gl);
  }

  createGeometry() {
    return new Geometry(this.gl);
  }

  dispose() {}
}
