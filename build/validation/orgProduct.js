"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orgProductSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _general = require("./general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const orgProductSchema = _joi.default.object({
  name: _general.addr.required(),
  category: _general.addr.required(),
  minimumQuantity: _general.addr.required(),
  maxQuantity: _general.addr.required()
});

exports.orgProductSchema = orgProductSchema;