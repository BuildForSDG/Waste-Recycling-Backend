import express from 'express';
import { notFound, serverError, headers } from './middleware';
import { user, org, userProduct } from './routes';

const createApp = () => {
  const app = express();

  app.use(headers);

  app.use(express.json());

  app.use('/api/v1/auth', user);
  app.use('/api/v1/auth', org);
  app.use('/api/v1', userProduct);

  app.use(notFound);

  app.use(serverError);

  return app;
};

export default createApp;
