import {mat4} from 'gl-matrix';

import {DEG_TO_RAD} from './Math';

export default class Matrix4 {

  constructor() {
    this.matrix = mat4.create();
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

  getMatrix() {
    return this.matrix;
  }
}

export function perspective(matrix, width, height) {
  mat4.perspective(matrix, 45, width / height, 0.1, 100.0);
}
