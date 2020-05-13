/* eslint-disable import/prefer-default-export */
import { BadRequest } from '../errors';

export const validate = async (schema, payload) => {
  await schema.validateAsync(payload, { abortEarly: false })
    .catch((error) => { throw new BadRequest(error); });
};
