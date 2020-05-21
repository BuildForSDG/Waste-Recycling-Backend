
export { uploader } from 'cloudinary';

require('dotenv').config();

export const {
  CLOUDINARY_CLOUD_NAME = 'lamido',
  CLOUDINARY_API_KEY = '927959681497938',
  CLOUDINARY_API_SECRET = 'vUv7rH3XiKxkA4qWlvtnLsw6tn8'
} = process.env;
