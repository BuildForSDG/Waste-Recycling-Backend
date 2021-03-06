import { Router } from 'express';
import {
  createUser, signIn, profileUpdate, deleteUser, viewProfile
} from '../controllers';
import {
  catchAsync, guest, authAccount, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/create-user', guest, catchAsync(createUser));

router.post('/login', guest, catchAsync(signIn));

router.patch('/users/:id', authAccount, cloudinary, multerUploadSingle, catchAsync(profileUpdate));

router.delete('/users/:id', authAccount, catchAsync(deleteUser));

router.get('/users/:id', catchAsync(viewProfile));

export default router;
