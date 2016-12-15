import Matrix4 from './math/Matrix4';
import Vector3 from './math/Vector3';

let currentId = 0;

export default class Object3D {

  constructor(geometry, material) {
    this.id = currentId++;
    this.matrix = new Matrix4();

    this.position = new Vector3();
    this.rotation = new Vector3();
    this.scale = new Vector3(1, 1, 1);

    // use dirty flag pattern to avoid multiple updates/frame
    this.matrixNeedsUpdate = false;

    this.geometry = geometry;
    this.material = material;
  }

  updateMatrix() {
    this.matrix.updateMatrix(this.position, this.rotation, this.scale);
  }

  getMatrix() {
    return this.matrix.getMatrix();
  }

  dispose() {
    this.geometry.dispose();
  }
}
