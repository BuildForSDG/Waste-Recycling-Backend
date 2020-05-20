/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { createOrgSchema, validate } from '../validation';
import { Org } from '../models';
import { BadRequest } from '../errors';
import { getToken } from '../config';

const createOrg = async (req, res) => {
  await validate(createOrgSchema, req.body);

  const { email, name, password } = req.body;

  const found = await Org.exists({ email });

  if (found) {
    throw new BadRequest('Invalid email');
  }

  const org = await Org.create({
    email,
    name,
    password
  });

  const token = await getToken(org._id);

  res.json({
    status: 'success',
    data: {
      message: 'organization created succesful',
      token,
      org
    }
  });
};

export { createOrg };
