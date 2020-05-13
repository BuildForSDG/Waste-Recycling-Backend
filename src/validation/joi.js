/* eslint-disable import/prefer-default-export */
import { BadRequest } from '../errors';

export const validate = async (schema, payload) => {
  try {
    const validateAsync = await schema.validateAsync(payload, { abortEarly: false });
    return validateAsync;
  } catch (error) {
    throw new BadRequest(error);
  }
};
