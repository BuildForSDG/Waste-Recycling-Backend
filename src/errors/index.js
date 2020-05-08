/* eslint-disable max-classes-per-file */
export class BadRequest extends Error {
  constructor(message = 'Bad Request') {
    super(message);

    this.status = 400;
  }
}

export class Unauthorize extends Error {
  constructor(message = 'Unauthorize') {
    super(message);

    this.status = 401;
  }
}
