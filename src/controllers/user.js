/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { createUserSchema, loginSchema, validate } from '../validation';
import { User } from '../models';
import { BadRequest, Unauthorize } from '../errors';
import { getToken } from '../config';

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

  const token = await getToken(user._id);

  res.json({
    status: 'success',
    data: {
      message: 'user create succesful',
      token,
      user
    }
  });
};

const userlogIn = async (req, res) => {
  await validate(loginSchema, req.body);

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user.matchesPassword(password)) {
    throw new Unauthorize('Incorrect email or password');
  }

  const token = await getToken(user._id);

  res.json({
    status: 'success',
    data: {
      message: 'User login succesful',
      token,
      user
    }
  });
};

export { createUser, userlogIn as signIn };
