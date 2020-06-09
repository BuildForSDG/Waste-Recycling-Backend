"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSchema = exports.loginSchema = exports.createUserSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _general = require("./general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUserSchema = _joi.default.object({
  email: _general.email,
  name: _general.name,
  password: _general.password,
  passwordConfirmation: _general.passwordConfirmation
});

exports.createUserSchema = createUserSchema;

const loginSchema = _joi.default.object({
  email: _general.email,
  password: _general.password
});

exports.loginSchema = loginSchema;

const updateSchema = _joi.default.object({
  gender: _general.gender,
  country: _general.country,
  state: _general.state,
  cityTown: _general.cityTown,
  imageUrl: _general.imageUrl
});

exports.updateSchema = updateSchema;