/* eslint-disable import/prefer-default-export */
import { isLoggedIn, decodeToken } from '../auth';
import { BadRequest, Unauthorize } from '../errors';

export const guest = (req, res, next) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest('You are already logged in'));
  }

  return next();
};

export const authAccount = async (req, res, next) => {
  const { id } = req.params;

  if (!isLoggedIn(req)) {
    return next(new Unauthorize('You must logged in'));
  }

  const { userId } = await decodeToken(req, next);

  if (id !== userId) {
    return next(new Unauthorize('Not Unauthorize user'));
  }

  return next();
};

export const auth = async (req, res, next) => {
  if (!isLoggedIn(req)) {
    return next(new Unauthorize('You must logged in'));
  }

  await decodeToken(req, next);

  return next();
};
