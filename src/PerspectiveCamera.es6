import {perspective} from './math/Matrix4';
import SceneObject from './SceneObject';
import Matrix4 from './math/Matrix4';

export default class PerspectiveCamera extends SceneObject {

  constructor(width, height) {
    super();

    this.projectionMatrix = new Matrix4();
    perspective(this.projectionMatrix, width, height);
  }

  getProjectionMatrix() {
    return this.projectionMatrix.getMatrix();
  }

  dispose() {
    super.dispose();
  }
}
