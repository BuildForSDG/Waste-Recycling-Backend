"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloudinary = void 0;

var _cloudinary = require("cloudinary");

var _config = require("../config");

/* eslint-disable import/prefer-default-export */
const cloudinary = (req, res, next) => {
  (0, _cloudinary.config)({
    cloud_name: _config.CLOUDINARY_CLOUD_NAME,
    api_key: _config.CLOUDINARY_API_KEY,
    api_secret: _config.CLOUDINARY_API_SECRET
  });
  next();
};

exports.cloudinary = cloudinary;