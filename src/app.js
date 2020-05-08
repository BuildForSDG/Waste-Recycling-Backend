import express from 'express';
import { notFound, serverError, headers } from './middleware';

const createApp = () => {
  const app = express();

  app.use(headers);

  app.use(express.json());

  app.use(notFound);

  app.use(serverError);

  return app;
};

export default createApp;
