"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multerUploadArray = exports.multerUploadSingle = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.memoryStorage();

const multerUploadSingle = (0, _multer.default)({
  storage
}).single('image');
exports.multerUploadSingle = multerUploadSingle;
const multerUploadArray = (0, _multer.default)({
  storage
}).array('photos', 12);
exports.multerUploadArray = multerUploadArray;