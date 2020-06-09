"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IN_PROD = exports.APP_PORT = exports.NODE_ENV = void 0;
const {
  NODE_ENV = 'development',
  APP_PORT = 3000
} = process.env;
exports.APP_PORT = APP_PORT;
exports.NODE_ENV = NODE_ENV;
const IN_PROD = NODE_ENV === 'production';
exports.IN_PROD = IN_PROD;