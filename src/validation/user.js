/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
/* prettier-ignore */
import {
  email, name, password, passwordConfirmation, gender, country, state, cityTown, imageUrl
} from './general';

export const createUserSchema = Joi.object({
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
  gender,
  country,
  state,
  cityTown,
  imageUrl
});
