"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

/* eslint-disable func-names */
const productStatusSchema = new _mongoose.Schema({
  status: String,
  pickUpDate: String,
  orgProduct: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'OrgProduct'
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userProduct: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'UserProduct'
  }
}, {
  timestamps: true
});
productStatusSchema.set('toJSON', {
  transform: (doc, {
    __v,
    _id,
    password,
    ...rest
  }) => {
    rest.id = _id;
    return rest;
  }
});
const ProductStatus = (0, _mongoose.model)('productStatus', productStatusSchema);
var _default = ProductStatus;
exports.default = _default;