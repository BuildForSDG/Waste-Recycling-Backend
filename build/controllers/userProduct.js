"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rejectAccept = exports.userViewProduct = exports.userViewAllProducts = exports.userPostProduct = void 0;

var _validation = require("../validation");

var _models = require("../models");

var _errors = require("../errors");

var _config = require("../config");

var _utils = require("../utils");

const userPostProduct = async (req, res) => {
  await (0, _validation.validate)(_validation.userProductSchema, req.body);
  const {
    productId
  } = req.params;
  const {
    quantity,
    location
  } = req.body;
  const userId = await (0, _config.getId)(req);
  const found = await _models.OrgProduct.exists({
    _id: productId
  });

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  const imageUrl = await (0, _utils.processImageToUrl)(req);
  const product = await _models.UserProduct.create({
    userId,
    orgProduct: productId,
    quantity,
    location,
    imageUrl
  });
  const productOrg = await _models.OrgProduct.findById({
    _id: productId
  });
  await productOrg.userProduct.push(product);
  await productOrg.save();
  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

exports.userPostProduct = userPostProduct;

const userViewAllProducts = async (req, res) => {
  const userId = await (0, _config.getId)(req);
  const product = await _models.UserProduct.find({
    userId
  });
  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

exports.userViewAllProducts = userViewAllProducts;

const userViewProduct = async (req, res) => {
  const {
    productId
  } = req.params;
  const userId = await (0, _config.getId)(req);
  const product = await _models.UserProduct.find({
    userId,
    _id: productId
  }).populate('orgProduct', '-userProduct');
  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      product
    }
  });
};

exports.userViewProduct = userViewProduct;

const userViewProductRejectAccept = async (req, res) => {
  await (0, _validation.validate)(_validation.statusParamsSchema, req.params);
  const userId = await (0, _config.getId)(req);
  const {
    status
  } = req.params;

  if (status === 'rejected') {
    const rejectedProduct = await _models.ProductStatus.find({
      status: 'rejected',
      userId
    });
    res.json({
      status: 'success',
      data: {
        message: 'Request send succesfully',
        rejectedProduct
      }
    });
  }

  const acceptedProduct = await _models.ProductStatus.find({
    status: 'accepted',
    userId
  });
  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      acceptedProduct
    }
  });
};

exports.rejectAccept = userViewProductRejectAccept;