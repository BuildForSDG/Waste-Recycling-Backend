import { Router } from 'express';
import { createUser, signIn, profileUpdate } from '../controllers';
import {
  catchAsync, guest, authAccount, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/create-user', guest, catchAsync(createUser));

router.post('/login', guest, catchAsync(signIn));

router.patch('/users/:id', authAccount, cloudinary, multerUploadSingle, catchAsync(profileUpdate));

export default router;
