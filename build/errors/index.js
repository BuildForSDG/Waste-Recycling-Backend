"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Unauthorize = exports.BadRequest = void 0;

/* eslint-disable max-classes-per-file */
class BadRequest extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.status = 400;
  }

}

exports.BadRequest = BadRequest;

class Unauthorize extends Error {
  constructor(message = 'Unauthorize') {
    super(message);
    this.status = 401;
  }

}

exports.Unauthorize = Unauthorize;