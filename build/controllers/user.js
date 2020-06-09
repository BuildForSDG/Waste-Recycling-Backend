"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewProfile = exports.deleteUser = exports.profileUpdate = exports.signIn = exports.createUser = void 0;

var _validation = require("../validation");

var _models = require("../models");

var _errors = require("../errors");

var _config = require("../config");

var _utils = require("../utils");

const createUser = async (req, res) => {
  await (0, _validation.validate)(_validation.createUserSchema, req.body);
  const {
    email,
    name,
    password
  } = req.body;
  const found = await _models.User.exists({
    email
  });

  if (found) {
    throw new _errors.BadRequest('Invalid email');
  }

  const user = await _models.User.create({
    email,
    name,
    password
  });
  const token = await (0, _config.getToken)(user.id);
  res.json({
    status: 'success',
    data: {
      message: 'user create succesfully',
      token,
      user
    }
  });
};

exports.createUser = createUser;

const userlogIn = async (req, res) => {
  await (0, _validation.validate)(_validation.loginSchema, req.body);
  const {
    email,
    password
  } = req.body;
  const user = await _models.User.findOne({
    email
  });

  if (!user || !(await user.matchesPassword(password))) {
    throw new _errors.Unauthorize('Incorrect email or password');
  }

  const token = await (0, _config.getToken)(user.id);
  res.json({
    status: 'success',
    data: {
      message: 'User login succesful',
      token,
      user
    }
  });
};

exports.signIn = userlogIn;

const userProfileUpdate = async (req, res) => {
  await (0, _validation.validate)(_validation.updateSchema, req.body);
  const {
    id
  } = req.params;
  const found = await _models.User.findById(id);

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  const imageUrl = await (0, _utils.processImageToUrl)(req);
  await _models.User.findByIdAndUpdate(id, { ...req.body,
    imageUrl
  }, {
    omitUndefined: true
  });
  res.json({
    status: 'success',
    data: {
      message: 'Profile Updated succesful'
    }
  });
};

exports.profileUpdate = userProfileUpdate;

const deleteUser = async (req, res) => {
  const {
    id
  } = req.params;
  const found = await _models.User.findById(id);

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  await _models.User.findByIdAndDelete(id);
  res.json({
    status: 'success',
    data: {
      message: 'User Deleted succesfull'
    }
  });
};

exports.deleteUser = deleteUser;

const viewProfile = async (req, res) => {
  const {
    id
  } = req.params;
  const found = await _models.User.findById(id);

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  res.json({
    status: 'success',
    data: {
      message: 'View Use succesfull',
      user: found
    }
  });
};

exports.viewProfile = viewProfile;