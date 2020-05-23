import { Router } from 'express';
import { createOrg, signIn, profileUpdate } from '../controllers';
/* prettier-ignore */
import {
  catchAsync, guest, authAccount, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/create-org', guest, catchAsync(createOrg));
router.post('/login', guest, catchAsync(signIn));

router.patch('/org/:id', authAccount, cloudinary, multerUploadSingle, catchAsync(profileUpdate));

export default router;
