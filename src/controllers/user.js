/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { createUserSchema, validate } from '../validation';
import { User } from '../models';
import { BadRequest } from '../errors';
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


export { createUser };
