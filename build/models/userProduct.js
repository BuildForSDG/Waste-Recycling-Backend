"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

/* eslint-disable func-names */
const userProductSchema = new _mongoose.Schema({
  quantity: String,
  location: String,
  imageUrl: String,
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orgProduct: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'OrgProduct'
  }
}, {
  timestamps: true
});
userProductSchema.set('toJSON', {
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
const UserProduct = (0, _mongoose.model)('UserProduct', userProductSchema);
var _default = UserProduct;
exports.default = _default;