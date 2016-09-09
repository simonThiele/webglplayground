import {mat4} from 'gl-matrix';

import {DEG_TO_RAD} from './Math';

export default class Object3D {

  constructor(geometry, material) {
    this.matrix = mat4.create();

    this.geometry = geometry;
    this.material = material;
  }

  rotateY(angle) {
    mat4.rotateY(this.matrix, this.matrix, angle * DEG_TO_RAD);
  }

  rotateX(angle) {
    mat4.rotateX(this.matrix, this.matrix, angle * DEG_TO_RAD);
  }

  dispose() {
    this.geometry.dispose();
  }
}
