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

export function createCube(webGLInstance) {
  const geometry = webGLInstance.createGeometry();

  const positionData = [
    // front
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,

    // back
    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,

    // top
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5,

    // bottom
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, 0.5,

    // left
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,

    // right
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5
  ];
  geometry.addAttribute(webGLInstance.createAttribute('position', positionData, 3));

  const colorData = [
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,

    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,

    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,

    1, 0, 1,
    1, 0, 1,
    1, 0, 1,
    1, 0, 1,

    1, 1, 0,
    1, 1, 0,
    1, 1, 0,
    1, 1, 0,

    1, 1, 1,
    1, 1, 1,
    1, 1, 1,
    1, 1, 1
  ];
  geometry.addAttribute(webGLInstance.createAttribute('color', colorData, 3));

  const indexData = [
    0, 1, 2,
    0, 2, 3,

    4, 5, 6,
    4, 6, 7,

    8, 9, 10,
    8, 10, 11,

    12, 13, 14,
    12, 14, 15,

    16, 17, 18,
    17, 18, 19,

    20, 21, 22,
    21, 22, 23
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
  createCube,
  createColoredMaterial
};
