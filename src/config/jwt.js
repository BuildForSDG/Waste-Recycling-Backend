/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const {
  RANDOM_TOKEN = 'vWLU/2D46fnUG0Ol1ozfQQ=='

} = process.env;


export const getToken = async (userId) => {
  const token = await jwt.sign({ userId }, `${RANDOM_TOKEN}`, { expiresIn: '24h' });
  return token;
};
