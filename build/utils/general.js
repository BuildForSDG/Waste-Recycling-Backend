"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterModel = void 0;

/* eslint-disable import/prefer-default-export */
const filterModel = async (Model, value) => {
  const filted = await Model.filter(object => object.status === value);
  return filted;
};

exports.filterModel = filterModel;