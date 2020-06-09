"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orgPostProduct = void 0;

var _validation = require("../validation");

var _models = require("../models");

var _config = require("../config");

var _utils = require("../utils");

/* eslint-disable import/prefer-default-export */
const orgPostProduct = async (req, res) => {
  await (0, _validation.validate)(_validation.orgProductSchema, req.body);
  const {
    name,
    category,
    minimumQuantity,
    maxQuantity
  } = req.body;
  const orgId = await (0, _config.getId)(req);
  const imageUrl = await (0, _utils.processImageToUrl)(req);
  const product = await _models.OrgProduct.create({
    orgId,
    name,
    category,
    minimumQuantity,
    maxQuantity,
    imageUrl
  });
  res.json({
    status: 'success',
    data: {
      message: 'Product created successfully',
      product
    }
  });
};

exports.orgPostProduct = orgPostProduct;