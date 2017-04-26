export function createRect(webGLInstance) {
  const geometry = webGLInstance.createGeometry();

  const positionData = [
    -0.5, 0.5, 0.0,
    -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0
  ];
  geometry.addAttribute(webGLInstance.createAttribute('position', positionData, 3));

  const colorData = [
    Math.random(), Math.random(), Math.random(),
    Math.random(), Math.random(), Math.random(),
    Math.random(), Math.random(), Math.random(),
    Math.random(), Math.random(), Math.random()
  ];
  geometry.addAttribute(webGLInstance.createAttribute('color', colorData, 3));

  const indexData = [
    0, 1, 2,
    0, 2, 3
  ];
  geometry.addAttribute(webGLInstance.createAttribute('index', indexData, 3));

  return geometry;
}

export function createColoredMaterial(webGLInstance) {
  const material = webGLInstance.createMaterial(
    webGLInstance.getShader('coloredVertexShader'),
    webGLInstance.getShader('coloredFragmentShader')
  );

  material.addAttribute('color', 'aVertexColor');

  return material;
}

export default {
  createRect,
  createColoredMaterial
};
