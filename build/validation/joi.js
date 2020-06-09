"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = void 0;

var _errors = require("../errors");

/* eslint-disable import/prefer-default-export */
const validate = async (schema, payload) => {
  await schema.validateAsync(payload, {
    abortEarly: false
  }).catch(error => {
    throw new _errors.BadRequest(error.message);
  });
};

exports.validate = validate;