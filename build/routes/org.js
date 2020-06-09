"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../controllers");

var _middleware = require("../middleware");

const router = (0, _express.Router)();
router.post('/create-org', _middleware.guest, (0, _middleware.catchAsync)(_controllers.createOrg));
router.post('/login-org', _middleware.guest, (0, _middleware.catchAsync)(_controllers.orglogIn));
router.patch('/org/:id', _middleware.authAccount, _middleware.cloudinary, _middleware.multerUploadSingle, (0, _middleware.catchAsync)(_controllers.orgProfileUpdate));
router.delete('/org/:id', _middleware.authAccount, (0, _middleware.catchAsync)(_controllers.deleteOrg));
router.get('/org/:id', (0, _middleware.catchAsync)(_controllers.viewOrgProfile));
var _default = router;
exports.default = _default;