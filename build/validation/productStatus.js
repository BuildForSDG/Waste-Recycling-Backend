"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postStatuschema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _general = require("./general");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
const postStatuschema = _joi.default.object({
  status: _general.status,
  pickUpDate: _general.addr.required()
});

exports.postStatuschema = postStatuschema;