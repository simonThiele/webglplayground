import {vec3} from 'gl-matrix';

export default class Vector3 {

  constructor() {
    this.vector = vec3.create();
  }

  set(x, y, z) {
    vec3.set(this.vector, x, y, z);
  }

  getVector() {
    return this.vector;
  }
}
