"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = require("./config");

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async () => {
  await _mongoose.default.connect(_config.MONGO_URI, _config.MONGO_OPTIONS);

  const normalizePort = val => {
    const port = parseInt(val, 10);

    if (port === '') {
      return val;
    }

    if (port >= 0) {
      return port;
    }

    return false;
  };

  const port = normalizePort(process.env.PORT || _config.APP_PORT);
  const app = (0, _app.default)();
  app.set('port', port); // eslint-disable-next-line no-console

  app.listen(port, () => console.log(`http://localhost:${port}`));
})();