/* eslint-disable import/prefer-default-export */

import Joi from '@hapi/joi';
// import { createOrgSchema, loginSchema, validate } from '../validation';

/* prettier-ignore */
import {
  email, name, password, passwordConfirmation, bio, address, country, state, cityTown, imageUrl
} from './general';

export const createOrgSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation
});

export const loginOrgSchema = Joi.object({
  email,
  password
});

export const updateOrgSchema = Joi.object({
  bio,
  address,
  country,
  state,
  cityTown,
  imageUrl
});
