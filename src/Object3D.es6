import SceneObject from './SceneObject';

export default class Object3D extends SceneObject {

  constructor(geometry, material) {
    super();

    this.geometry = geometry;
    this.material = material;
  }

  dispose() {
    super.dispose();

    this.geometry.dispose();
  }
}
