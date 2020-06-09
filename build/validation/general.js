"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.status = exports.address = exports.bio = exports.imageUrl = exports.cityTown = exports.state = exports.country = exports.gender = exports.addr = exports.passwordConfirmation = exports.password = exports.name = exports.email = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const email = _joi.default.string().email().min(10).max(254).lowercase().trim().required();

exports.email = email;

const name = _joi.default.string().min(2).max(130).required();

exports.name = name;

const password = _joi.default.string().min(10).max(_config.BCRYPT_MAX_BYTES, 'utf8').regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u).message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit').required();

exports.password = password;

const passwordConfirmation = _joi.default.valid(_joi.default.ref('password')).required();

exports.passwordConfirmation = passwordConfirmation;

const addr = _joi.default.string().min(2).max(200);

exports.addr = addr;

const gender = _joi.default.string().min(4).max(20);

exports.gender = gender;
const country = addr;
exports.country = country;
const state = addr;
exports.state = state;
const cityTown = addr;
exports.cityTown = cityTown;

const imageUrl = _joi.default.string().min(2).max(255);

exports.imageUrl = imageUrl;
const bio = addr;
exports.bio = bio;
const address = addr;
exports.address = address;

const status = _joi.default.string().valid('accepted', 'rejected').required();

exports.status = status;