export function createRect(webGLInstance) {
  const geometry = webGLInstance.createGeometry();

  const data = [
    0.5, 0.5, 0,
    -0.5, 0.5, 0,
    0.5, -0.5, 0,
    -0.5, -0.5, 0
  ];
  geometry.addAttribute(webGLInstance.createAttribute('position', data, 3));

  return geometry;
}

export default {
  createRect
};
