"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getId = exports.getToken = exports.RANDOM_TOKEN = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export */
_dotenv.default.config();

const {
  RANDOM_TOKEN = 'vWLU/2D46fnUG0Ol1ozfQQ=='
} = process.env;
exports.RANDOM_TOKEN = RANDOM_TOKEN;

const getToken = async userId => {
  const token = await _jsonwebtoken.default.sign({
    userId
  }, `${RANDOM_TOKEN}`, {
    expiresIn: '24h'
  });
  return token;
};

exports.getToken = getToken;

const getId = async req => {
  const token = await req.headers.authorization.split(' ')[1];
  const {
    userId
  } = await _jsonwebtoken.default.verify(token, `${RANDOM_TOKEN}`);
  const id = userId;
  return id;
};

exports.getId = getId;