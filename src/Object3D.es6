import Matrix4 from './math/Matrix4';

let currentId = 0;

export default class Object3D {

  constructor(geometry, material) {
    this.id = currentId++;
    this.matrix = new Matrix4();

    this.geometry = geometry;
    this.material = material;
  }

  rotateX(angle) {
    this.matrix.rotateX(angle);
  }

  rotateY(angle) {
    this.matrix.rotateY(angle);
  }

  rotateZ(angle) {
    this.matrix.rotateZ(angle);
  }

  getMatrix() {
    return this.matrix.getMatrix();
  }

  dispose() {
    this.geometry.dispose();
  }
}
