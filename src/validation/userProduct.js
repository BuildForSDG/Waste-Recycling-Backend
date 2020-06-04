/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import {
  addr,
  status
} from './general';

export const userProductSchema = Joi.object({
  quantity: addr.required(),
  location: addr.required()
});

export const statusParamsSchema = Joi.object({
  status
});
