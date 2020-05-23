/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
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

export const loginSchema = Joi.object({
  email,
  password
});

export const updateSchema = Joi.object({
  bio,
  address,
  country,
  state,
  cityTown,
  imageUrl
});
