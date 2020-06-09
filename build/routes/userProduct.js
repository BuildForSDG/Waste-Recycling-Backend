"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middleware = require("../middleware");

const router = (0, _express.Router)();
router.post('/user-product/:productId', _middleware.auth, _middleware.cloudinary, _middleware.multerUploadSingle, (0, _middleware.catchAsync)(_controllers.userPostProduct));
router.get('/user-product', _middleware.auth, (0, _middleware.catchAsync)(_controllers.userViewAllProducts));
router.get('/user-product/:productId', _middleware.auth, (0, _middleware.catchAsync)(_controllers.userViewProduct));
router.get('/user-product/status/:status', _middleware.auth, (0, _middleware.catchAsync)(_controllers.rejectAccept));
var _default = router;
exports.default = _default;