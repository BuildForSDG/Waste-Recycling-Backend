"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "uploader", {
  enumerable: true,
  get: function () {
    return _cloudinary.uploader;
  }
});
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = void 0;

var _cloudinary = require("cloudinary");

require('dotenv').config();

const {
  CLOUDINARY_CLOUD_NAME = 'lamido',
  CLOUDINARY_API_KEY = '927959681497938',
  CLOUDINARY_API_SECRET = 'vUv7rH3XiKxkA4qWlvtnLsw6tn8'
} = process.env;
exports.CLOUDINARY_API_SECRET = CLOUDINARY_API_SECRET;
exports.CLOUDINARY_API_KEY = CLOUDINARY_API_KEY;
exports.CLOUDINARY_CLOUD_NAME = CLOUDINARY_CLOUD_NAME;