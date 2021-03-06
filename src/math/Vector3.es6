import {vec3} from 'gl-matrix';

export default class Vector3 {

  constructor(x = 0, y = 0, z = 0) {
    this.vector = vec3.create();
    this.set(x, y, z);
  }

  set(x, y, z) {
    vec3.set(this.vector, x, y, z);
  }

  add(x, y, z) {
    vec3.set(this.vector,
      x + this.vector[0],
      y + this.vector[1],
      z + this.vector[2]
    );
  }

  sub(x, y, z) {
    vec3.set(this.vector,
      -x + this.vector[0],
      -y + this.vector[1],
      -z + this.vector[2]
    );
  }

  getX() {
    return this.vector[0];
  }

  getY() {
    return this.vector[1];
  }

  getZ() {
    return this.vector[2];
  }

  getVector() {
    return this.vector;
  }
}
