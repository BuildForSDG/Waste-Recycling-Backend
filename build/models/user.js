"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = require("bcryptjs");

var _config = require("../config");

/* eslint-disable func-names */
const userSchema = new _mongoose.Schema({
  email: String,
  name: String,
  password: String,
  gender: String,
  country: String,
  state: String,
  localGov: String,
  cityTown: String,
  imageUrl: String
}, {
  timestamps: true
});
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await (0, _bcryptjs.hash)(this.password, _config.BCRYPT_WORK_FACTOR);
  }
});

userSchema.methods.matchesPassword = function (password) {
  return (0, _bcryptjs.compare)(password, this.password);
};

userSchema.set('toJSON', {
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
const User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports.default = _default;