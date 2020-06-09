"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dataUrl = require("./dataUrl");

Object.keys(_dataUrl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dataUrl[key];
    }
  });
});

var _general = require("./general");

Object.keys(_general).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _general[key];
    }
  });
});