/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
/* prettier-ignore */
import {
  createOrgSchema, loginOrgSchema, updateOrgSchema, validate
} from '../validation';
import { Org } from '../models';
import { BadRequest, Unauthorize } from '../errors';
import { getToken } from '../config';
import { processImageToUrl } from '../utils';

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
      message: 'organization created succesfully',
      token,
      org
    }
  });
};

const orglogIn = async (req, res) => {
  await validate(loginOrgSchema, req.body);

  const { email, password } = req.body;

  const user = await Org.findOne({ email });

  if (!user || !(await user.matchesPassword(password))) {
    throw new Unauthorize('Incorrect email or password');
  }

  const token = await getToken(user.id);

  res.json({
    status: 'success',
    data: {
      message: 'User login successful',
      token,
      user
    }
  });
};

const orgProfileUpdate = async (req, res) => {
  await validate(updateOrgSchema, req.body);

  const { id } = req.params;

  let url;

  if (req.file) {
    url = await processImageToUrl(req);
  }

  const imageUrl = url;

  await Org.findByIdAndUpdate(id, { ...req.body, imageUrl }, { omitUndefined: true });

  res.json({
    status: 'success',
    data: {
      message: 'Profile Updated succesfully'
    }
  });
};

export { createOrg, orglogIn, orgProfileUpdate };
