"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acceptRejectUserProduct = void 0;

var _validation = require("../validation");

var _models = require("../models");

var _errors = require("../errors");

/* eslint-disable import/prefer-default-export */
const acceptRejectUserProduct = async (req, res) => {
  await (0, _validation.validate)(_validation.postStatuschema, req.body);
  const {
    productId
  } = req.params;
  const {
    status,
    pickUpDate
  } = req.body;
  const found = await _models.UserProduct.exists({
    _id: productId
  });

  if (!found) {
    throw new _errors.BadRequest('Invalid id');
  }

  const userProduct = await _models.UserProduct.findById({
    _id: productId
  }).select('orgProduct userId');
  const orgProductId = userProduct.orgProduct;
  const {
    userId
  } = userProduct;
  const orgProduct = await _models.OrgProduct.findById({
    _id: orgProductId
  }).select('id');
  const productStatus = await _models.ProductStatus.create({
    status,
    pickUpDate,
    orgProduct,
    userId,
    userProduct
  });
  res.json({
    status: 'success',
    data: {
      message: 'Request send succesfully',
      productStatus
    }
  });
};

exports.acceptRejectUserProduct = acceptRejectUserProduct;