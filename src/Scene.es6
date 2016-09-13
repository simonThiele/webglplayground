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
      renderer.render(camera, objects[i]);
    }
  }
}
