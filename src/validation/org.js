/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import { BCRYPT_MAX_BYTES } from '../config';
// prettier-ignore
const email = Joi.string().email().min(10).max(254)
  .lowercase()
  .trim()
  .required();

const name = Joi.string().min(2).max(130).required();

const password = Joi.string()
  .min(10)
  .max(BCRYPT_MAX_BYTES, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
  .required();

const passwordConfirmation = Joi.valid(Joi.ref('password')).required();
const bio = Joi.string().min(2).max(200);
const address = Joi.string().min(2).max(200);

export const createOrgSchema = Joi.object({
  email,
  name,
  password,
  passwordConfirmation,
  bio,
  address
});
