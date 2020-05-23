import Joi from '@hapi/joi';
import { BCRYPT_MAX_BYTES } from '../config';
/* prettier-ignore */
export const email = Joi.string().email().min(10).max(254)
  .lowercase()
  .trim()
  .required();

export const name = Joi.string().min(2).max(130).required();

export const password = Joi.string()
  .min(10)
  .max(BCRYPT_MAX_BYTES, 'utf8')
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
  .required();

export const passwordConfirmation = Joi.valid(Joi.ref('password')).required();

export const addr = Joi.string().min(2).max(200);

export const gender = Joi.string().min(4).max(20);

export const country = addr;

export const state = addr;

export const cityTown = addr;

export const imageUrl = Joi.string().min(2).max(255);

export const bio = addr;
export const address = addr;
