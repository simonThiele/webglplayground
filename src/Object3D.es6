export default class Object3D {

  constructor(geometry, material) {
    this.geometry = geometry;
    this.material = material;
  }

  dispose() {
    this.geometry.dispose();
  }
}
