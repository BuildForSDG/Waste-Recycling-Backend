"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _middleware = require("./middleware");

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createApp = () => {
  const app = (0, _express.default)();
  app.use(_middleware.headers);
  app.use(_express.default.json());
  app.use('/api/v1/auth', _routes.user);
  app.use('/api/v1/auth', _routes.org);
  app.use('/api/v1', _routes.userProduct);
  app.use('/api/v1', _routes.orgProduct);
  app.use('/api/v1', _routes.productStatus);
  app.use('/api/v1', _routes.orgviewproducts);
  app.use(_middleware.notFound);
  app.use(_middleware.serverError);
  return app;
};

var _default = createApp;
exports.default = _default;