export default class Scene {

  constructor() {
    this.sceneObjects = [];
  }

  add(object) {
    this.sceneObjects.push(object);
  }

  render(renderer, camera) {
    renderer.beginRender();

    const objects = this.sceneObjects;
    for (let i = 0, length = objects.length; i < length; i++) {
      const object = objects[i];

      // use dirty flag to update matrix only once
      if (object.matrixNeedsUpdate) {
        object.updateMatrix();
      }

      renderer.render(camera, objects[i]);
    }
  }
}
