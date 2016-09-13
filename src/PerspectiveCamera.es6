import {perspective} from './math/Matrix4';
import Matrix4 from './math/Matrix4';

export default class PerspectiveCamera {

  constructor(width, height) {
    this.projectionMatrix = new Matrix4();
    perspective(this.projectionMatrix, width, height);
  }

  getProjectionMatrix() {
    return this.projectionMatrix.getMatrix();
  }
}
