import {mat4} from 'gl-matrix';

import {DEG_TO_RAD} from './Math';
import Vector3 from './Vector3';

export default class Matrix4 {

  constructor() {
    this.matrix = mat4.create();
  }

  updateMatrix(position, rotation, scale) {
    // reset matrix
    mat4.identity(this.matrix);

    mat4.translate(this.matrix, this.matrix, position.getVector());
    this.rotateX(rotation.getX());
    this.rotateY(rotation.getY());
    this.rotateZ(rotation.getZ());
    mat4.scale(this.matrix, this.matrix, scale.getVector());
  }

  rotateX(angle) {
    mat4.rotateX(this.matrix, this.matrix, angle * DEG_TO_RAD);
  }

  rotateY(angle) {
    mat4.rotateY(this.matrix, this.matrix, angle * DEG_TO_RAD);
  }

  rotateZ(angle) {
    mat4.rotateZ(this.matrix, this.matrix, angle * DEG_TO_RAD);
  }

  translate(x, y, z) {
    const translationVector = new Vector3();
    translationVector.set(x, y, z);

    mat4.translate(this.matrix, this.matrix, translationVector.getVector());
  }

  compose(/* position, rotation, scale */) {
    // TODO: implement
  }

  getMatrix() {
    return this.matrix;
  }
}

export function perspective(matrix, width, height) {
  mat4.perspective(matrix, 45, width / height, 0.1, 100.0);
}
