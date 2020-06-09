"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middleware = require("../middleware");

const router = (0, _express.Router)();
router.get('/products', _middleware.authOrg, (0, _middleware.catchAsync)(_controllers.ViewAllProducts));
router.get('/product/:id', _middleware.authOrg, (0, _middleware.catchAsync)(_controllers.viewOneProduct));
var _default = router;
exports.default = _default;