import {multiply, invert, perspective} from './math/Matrix4';
import SceneObject from './SceneObject';
import Matrix4 from './math/Matrix4';

export default class PerspectiveCamera extends SceneObject {

  constructor(width, height) {
    super();

    this.projectionMatrix = new Matrix4();
    perspective(this.projectionMatrix, width, height);

    this.viewProjectionMatrix = new Matrix4();
  }

  getProjectionMatrix() {
    return this.projectionMatrix.getMatrix();
  }

  getViewProjectionMatrix() {
    return this.viewProjectionMatrix;
  }

  updateMatrix() {
    super.updateMatrix();
    this.computeViewProjectionMatrix();
  }

  computeViewProjectionMatrix() {
    const viewMatrix = invert(this.getMatrix());
    this.viewProjectionMatrix = multiply(viewMatrix, this.getProjectionMatrix());
  }

  dispose() {
    super.dispose();
  }
}
