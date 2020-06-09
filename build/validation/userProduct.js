"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusParamsSchema = exports.userProductSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _general = require("./general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const userProductSchema = _joi.default.object({
  quantity: _general.addr.required(),
  location: _general.addr.required()
});

exports.userProductSchema = userProductSchema;

const statusParamsSchema = _joi.default.object({
  status: _general.status
});

exports.statusParamsSchema = statusParamsSchema;