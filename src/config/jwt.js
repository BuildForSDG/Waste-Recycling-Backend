/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export const {
  RANDOM_TOKEN = 'vWLU/2D46fnUG0Ol1ozfQQ=='

} = process.env;


export const getToken = async (userId) => {
  const token = await jwt.sign({ userId }, `${RANDOM_TOKEN}`, { expiresIn: '24h' });
  return token;
};
export const getId = async (req) => {
  const token = await req.headers.authorization.split(' ')[1];

  const { userId } = await jwt.verify(token, `${RANDOM_TOKEN}`);
  const id = userId;

  return id;
};
