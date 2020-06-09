"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverError = exports.notFound = exports.catchAsync = void 0;

/* eslint-disable no-unused-vars */
const catchAsync = handler => (...args) => handler(...args).catch(args[2]);

exports.catchAsync = catchAsync;

const notFound = (req, res, next) => res.status(404).json({
  status: 'error',
  message: 'Not Found'
});

exports.notFound = notFound;

const serverError = (err, req, res, next) => {
  if (!err.status) {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }

  return res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
};

exports.serverError = serverError;