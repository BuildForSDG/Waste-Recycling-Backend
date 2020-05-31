/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import {
  addr
} from './general';

export const userProductSchema = Joi.object({
  quantity: addr.required(),
  location: addr.required()
});
