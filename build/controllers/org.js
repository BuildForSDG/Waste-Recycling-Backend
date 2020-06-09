"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewOrgProfile = exports.deleteOrg = exports.orgProfileUpdate = exports.orglogIn = exports.createOrg = void 0;

var _validation = require("../validation");

var _models = require("../models");

var _errors = require("../errors");

var _config = require("../config");

var _utils = require("../utils");

const createOrg = async (req, res) => {
  await (0, _validation.validate)(_validation.createOrgSchema, req.body);
  const {
    email,
    name,
    password
  } = req.body;
  const found = await _models.Org.exists({
    email
  });

  if (found) {
    throw new _errors.BadRequest('Invalid email');
  }

  const org = await _models.Org.create({
    email,
    name,
    password
  });
  const token = await (0, _config.getToken)(org.id);
  res.json({
    status: 'success',
    data: {
      message: 'organization created succesfully',
      token,
      org
    }
  });
};

exports.createOrg = createOrg;

const orglogIn = async (req, res) => {
  await (0, _validation.validate)(_validation.loginOrgSchema, req.body);
  const {
    email,
    password
  } = req.body;
  const org = await _models.Org.findOne({
    email
  });

  if (!org || !(await org.matchesPassword(password))) {
    throw new _errors.Unauthorize('Incorrect email or password');
  }

  const token = await (0, _config.getToken)(org.id);
  res.json({
    status: 'success',
    data: {
      message: 'Organization login successful',
      token,
      org
    }
  });
};

exports.orglogIn = orglogIn;

const orgProfileUpdate = async (req, res) => {
  await (0, _validation.validate)(_validation.updateOrgSchema, req.body);
  const {
    id
  } = req.params;
  const found = await _models.Org.findById(id);

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  const imageUrl = await (0, _utils.processImageToUrl)(req);
  await _models.Org.findByIdAndUpdate(id, { ...req.body,
    imageUrl
  }, {
    omitUndefined: true
  });
  res.json({
    status: 'success',
    data: {
      message: 'Profile Updated succesfully'
    }
  });
};

exports.orgProfileUpdate = orgProfileUpdate;

const deleteOrg = async (req, res) => {
  const {
    id
  } = req.params;
  const found = await _models.Org.findById(id);

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  await _models.Org.findByIdAndDelete(id);
  res.json({
    status: 'success',
    data: {
      message: 'Organization Deleted succesfully'
    }
  });
};

exports.deleteOrg = deleteOrg;

const viewOrgProfile = async (req, res) => {
  const {
    id
  } = req.params;
  const found = await _models.Org.findById(id);

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  res.json({
    status: 'success',
    data: {
      message: 'View Organiation succesfull',
      org: found
    }
  });
};

exports.viewOrgProfile = viewOrgProfile;