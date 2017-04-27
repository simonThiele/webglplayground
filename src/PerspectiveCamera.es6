import {invert, perspective} from './math/Matrix4';
import SceneObject from './SceneObject';
import Matrix4 from './math/Matrix4';

export default class PerspectiveCamera extends SceneObject {

  constructor(width, height) {
    super();

    this.projectionMatrix = new Matrix4();
    perspective(this.projectionMatrix, width, height);

    // Make a view matrix from the camera matrix.
    this.viewMatrix = new Matrix4();
  }

  getProjectionMatrix() {
    return this.projectionMatrix.getMatrix();
  }

  computeViewMatrix() {
    invert(this.viewMatrix.getMatrix(), this.getMatrix());
  }

  getViewMatrix() {
    return this.viewMatrix;
  }

  dispose() {
    super.dispose();
  }
}
