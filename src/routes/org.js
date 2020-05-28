import { Router } from 'express';
import { createOrg, orglogIn, orgProfileUpdate } from '../controllers';
import {
  catchAsync, guest, authAccount, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/create-org', guest, catchAsync(createOrg));
router.post('/login-org', guest, catchAsync(orglogIn));

router.patch('/org/:id', authAccount, cloudinary, multerUploadSingle, catchAsync(orgProfileUpdate));

export default router;
