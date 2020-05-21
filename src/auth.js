import jwt from 'jsonwebtoken';
import { RANDOM_TOKEN } from './config';
import { BadRequest } from './errors';

export const isLoggedIn = (req) => {
  if (!req.headers.authorization) {
    return false;
  }
  return true;
};

export const decodeToken = async (req, next) => {
  try {
    const token = await req.headers.authorization.split(' ')[1];

    const decodedToken = await jwt.verify(token, `${RANDOM_TOKEN}`);

    return decodedToken;
  } catch (error) {
    return next(new BadRequest(error.message));
  }
};
