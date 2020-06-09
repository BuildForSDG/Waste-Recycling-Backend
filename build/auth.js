"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeToken = exports.isLoggedIn = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("./config");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isLoggedIn = req => {
  if (!req.headers.authorization) {
    return false;
  }

  return true;
};

exports.isLoggedIn = isLoggedIn;

const decodeToken = async (req, next) => {
  try {
    const token = await req.headers.authorization.split(' ')[1];
    const decodedToken = await _jsonwebtoken.default.verify(token, `${_config.RANDOM_TOKEN}`);
    return decodedToken;
  } catch (error) {
    return next(new _errors.BadRequest(error.message));
  }
};

exports.decodeToken = decodeToken;