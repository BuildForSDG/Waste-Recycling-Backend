"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

/* eslint-disable func-names */
const orgProductSchema = new _mongoose.Schema({
  orgId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'OrgProduct'
  },
  name: String,
  category: String,
  minimumQuantity: String,
  maxQuantity: String,
  imageUrl: String,
  userProduct: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'UserProduct'
  }]
}, {
  timestamps: true
});
orgProductSchema.set('toJSON', {
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
const OrgProduct = (0, _mongoose.model)('OrgProduct', orgProductSchema);
var _default = OrgProduct;
exports.default = _default;