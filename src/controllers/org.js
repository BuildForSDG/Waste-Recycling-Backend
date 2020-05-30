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

  const token = await getToken(org.id);

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

  const org = await Org.findOne({ email });

  if (!org || !(await org.matchesPassword(password))) {
    throw new Unauthorize('Incorrect email or password');
  }

  const token = await getToken(org.id);

  res.json({
    status: 'success',
    data: {
      message: 'Organization login successful',
      token,
      org
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

const deleteOrg = async (req, res) => {
  const { id } = req.params;

  const found = await Org.findById(id);

  if (!found) {
    throw new BadRequest('Invalid id');
  }
  await Org.findByIdAndDelete(id);

  res.json({
    status: 'success',
    data: {
      message: 'Organization Deleted succesfull'
    }
  });
};

const viewOrgProfile = async (req, res) => {
  const { id } = req.params;

  const found = await Org.findById(id);

  if (!found) {
    throw new BadRequest('Invalid id');
  }

  res.json({
    status: 'success',
    data: {
      message: 'View Organiation succesfull',
      org: found
    }
  });
};

export {
  createOrg, orglogIn, orgProfileUpdate, deleteOrg, viewOrgProfile
};
