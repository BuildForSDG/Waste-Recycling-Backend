"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processImageToUrl = exports.dataUri = void 0;

var _parser = _interopRequireDefault(require("datauri/parser"));

var _path = _interopRequireDefault(require("path"));

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dUri = new _parser.default();

const dataUri = req => {
  const uri = dUri.format(_path.default.extname(req.file.originalname).toString(), req.file.buffer);
  return uri;
};

exports.dataUri = dataUri;

const processImageToUrl = async req => {
  if (req.file) {
    const file = await dataUri(req).content;
    const {
      url
    } = await _config.uploader.upload(file);
    return url;
  }

  return undefined;
};

exports.processImageToUrl = processImageToUrl;