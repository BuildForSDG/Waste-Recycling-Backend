import mongoose from 'mongoose';
import { APP_PORT, MONGO_URI, MONGO_OPTIONS } from './config';
import createApp from './app';

(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
  const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (port === '') {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

  const port = normalizePort(process.env.PORT || APP_PORT);

  const app = createApp();

  app.set('port', port);

  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`http://localhost:${port}`));
})();
