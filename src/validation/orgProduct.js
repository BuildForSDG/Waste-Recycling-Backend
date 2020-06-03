/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import {
  addr
} from './general';

export const orgProductSchema = Joi.object({
  name: addr.required(),
  category: addr.required(),
  minimumQuantity: addr.required(),
  maxQuantity: addr.required()
});
