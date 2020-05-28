import {
  createUserSchema, loginSchema, updateSchema, validate
} from '../validation';
import { User } from '../models';
import { BadRequest, Unauthorize } from '../errors';
import { getToken } from '../config';
import { processImageToUrl } from '../utils';

const createUser = async (req, res) => {
  await validate(createUserSchema, req.body);

  const { email, name, password } = req.body;

  const found = await User.exists({ email });

  if (found) {
    throw new BadRequest('Invalid email');
  }

  const user = await User.create({
    email,
    name,
    password
  });

  const token = await getToken(user.id);

  res.json({
    status: 'success',
    data: {
      message: 'user create succesfully',
      token,
      user
    }
  });
};

const userlogIn = async (req, res) => {
  await validate(loginSchema, req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !(await user.matchesPassword(password))) {
    throw new Unauthorize('Incorrect email or password');
  }

  const token = await getToken(user.id);

  res.json({
    status: 'success',
    data: {
      message: 'User login succesful',
      token,
      user
    }
  });
};

const userProfileUpdate = async (req, res) => {
  await validate(updateSchema, req.body);

  const { id } = req.params;

  const found = await User.findById(id);

  if (!found) {
    throw new BadRequest('Invalid id');
  }

  let url;

  if (req.file) {
    url = await processImageToUrl(req);
  }

  const imageUrl = url;

  await User.findByIdAndUpdate(id, { ...req.body, imageUrl }, { omitUndefined: true });

  res.json({
    status: 'success',
    data: {
      message: 'Profile Updated succesful'
    }
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const found = await User.findById(id);

  if (!found) {
    throw new BadRequest('Invalid id');
  }
  await User.findByIdAndDelete(id);

  res.json({
    status: 'success',
    data: {
      message: 'User Deleted succesfull'
    }
  });
};

const viewProfile = async (req, res) => {
  const { id } = req.params;

  const found = await User.findById(id);

  if (!found) {
    throw new BadRequest('Invalid id');
  }

  res.json({
    status: 'success',
    data: {
      message: 'View Use succesfull',
      user: found
    }
  });
};


export {
  createUser, userlogIn as signIn, userProfileUpdate as profileUpdate, deleteUser, viewProfile
};
