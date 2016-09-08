// https://www.khronos.org/webgl/wiki/FAQ
// it is recommended that you check for success or failure to initialize.
// if WebGL fails to initialize it is recommended you distinguish between failure
// because the browser doesn't support WebGL and failure for some other reason.
// if the browser does not support WebGL then the map will not be rendered.
// you can determine if the browser supports WebGL by checking for the existence of WebGLRenderingContext.
export function getWebGLCanvasContext(canvas) {
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
