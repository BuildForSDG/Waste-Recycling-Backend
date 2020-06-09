"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headers = void 0;

// eslint-disable-next-line import/prefer-default-export
const headers = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
};

exports.headers = headers;