"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewOneProduct = exports.ViewAllProducts = void 0;

var _config = require("../config");

var _models = require("../models");

var _errors = require("../errors");

/* eslint-disable import/prefer-default-export */
const ViewAllProducts = async (req, res) => {
  const orgId = await (0, _config.getId)(req);
  const view = await _models.OrgProduct.find({
    orgId
  }).populate('userProduct');
  res.json({
    status: 'success',
    data: {
      message: 'products retrieved succesfully',
      view
    }
  });
};

exports.ViewAllProducts = ViewAllProducts;

const viewOneProduct = async (req, res) => {
  const {
    id
  } = req.params;
  const found = await _models.OrgProduct.exists({
    _id: id
  });

  if (!found) {
    throw new _errors.Unauthorize('No product like this');
  }

  const product = await _models.OrgProduct.findById(id);
  res.json({
    status: 'success',
    data: {
      message: 'product retrieved succesfully',
      product
    }
  });
};

exports.viewOneProduct = viewOneProduct;