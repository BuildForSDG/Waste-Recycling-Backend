/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';
import {
  addr,
  status
} from './general';

export const postStatuschema = Joi.object({
  status,
  pickUpDate: addr.required()
});
