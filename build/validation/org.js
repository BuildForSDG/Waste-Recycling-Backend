"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrgSchema = exports.loginOrgSchema = exports.createOrgSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _general = require("./general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createOrgSchema = _joi.default.object({
  email: _general.email,
  name: _general.name,
  password: _general.password,
  passwordConfirmation: _general.passwordConfirmation
});

exports.createOrgSchema = createOrgSchema;

const loginOrgSchema = _joi.default.object({
  email: _general.email,
  password: _general.password
});

exports.loginOrgSchema = loginOrgSchema;

const updateOrgSchema = _joi.default.object({
  bio: _general.bio,
  address: _general.address,
  country: _general.country,
  state: _general.state,
  cityTown: _general.cityTown,
  imageUrl: _general.imageUrl
});

exports.updateOrgSchema = updateOrgSchema;