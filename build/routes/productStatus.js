"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middleware = require("../middleware");

const router = (0, _express.Router)();
router.post('/status/:productId', _middleware.authOrg, (0, _middleware.catchAsync)(_controllers.acceptRejectUserProduct));
var _default = router;
exports.default = _default;