"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MONGO_OPTIONS = exports.MONGO_URI = void 0;
const {
  MONGO_USERNAME = 'team-042',
  MONGO_PASSWORD = 'ieczN9USx2nf-3T',
  MONGO_HOST = 'ds261450.mlab.com',
  MONGO_PORT = 61450,
  MONGO_DATABASE = 'waste-recycling'
} = process.env;
const MONGO_URI = `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
exports.MONGO_URI = MONGO_URI;
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
exports.MONGO_OPTIONS = MONGO_OPTIONS;