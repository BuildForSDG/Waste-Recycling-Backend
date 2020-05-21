/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import {
  email,
  name,
  password,
  passwordConfirmation,
  bio,
  address
} from './general';

export const createOrgSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
  bio,
  address
});
