"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middleware = require("../middleware");

const router = (0, _express.Router)();
router.post('/create-user', _middleware.guest, (0, _middleware.catchAsync)(_controllers.createUser));
router.post('/login', _middleware.guest, (0, _middleware.catchAsync)(_controllers.signIn));
router.patch('/users/:id', _middleware.authAccount, _middleware.cloudinary, _middleware.multerUploadSingle, (0, _middleware.catchAsync)(_controllers.profileUpdate));
router.delete('/users/:id', _middleware.authAccount, (0, _middleware.catchAsync)(_controllers.deleteUser));
router.get('/users/:id', (0, _middleware.catchAsync)(_controllers.viewProfile));
var _default = router;
exports.default = _default;