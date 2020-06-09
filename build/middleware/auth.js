"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authOrg = exports.auth = exports.authAccount = exports.guest = void 0;

var _auth = require("../auth");

var _errors = require("../errors");

var _models = require("../models");

/* eslint-disable import/prefer-default-export */
const guest = (req, res, next) => {
  if ((0, _auth.isLoggedIn)(req)) {
    return next(new _errors.BadRequest('You are already logged in'));
  }

  return next();
};

exports.guest = guest;

const authAccount = async (req, res, next) => {
  const {
    id
  } = req.params;

  if (!(0, _auth.isLoggedIn)(req)) {
    return next(new _errors.Unauthorize('You must logged in'));
  }

  const {
    userId
  } = await (0, _auth.decodeToken)(req, next);

  if (id !== userId) {
    return next(new _errors.Unauthorize('Not Unauthorize user'));
  }

  return next();
};

exports.authAccount = authAccount;

const auth = async (req, res, next) => {
  if (!(0, _auth.isLoggedIn)(req)) {
    return next(new _errors.Unauthorize('You must logged in'));
  }

  const {
    userId
  } = await (0, _auth.decodeToken)(req, next);
  const found = await _models.User.exists({
    _id: userId
  });

  if (!found) {
    return next(new _errors.Unauthorize('You must logged in as User'));
  }

  return next();
};

exports.auth = auth;

const authOrg = async (req, res, next) => {
  if (!(0, _auth.isLoggedIn)(req)) {
    return next(new _errors.Unauthorize('You must logged in'));
  }

  const {
    userId
  } = await (0, _auth.decodeToken)(req, next);
  const found = await _models.Org.exists({
    _id: userId
  });

  if (!found) {
    return next(new _errors.Unauthorize('You must logged in as org'));
  }

  return next();
};

exports.authOrg = authOrg;