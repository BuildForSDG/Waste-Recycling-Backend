import { Router } from 'express';
import {
  createOrg, orglogIn, orgProfileUpdate, viewOrgProfile, deleteOrg
} from '../controllers';
import {
  catchAsync, guest, authAccount, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/create-org', guest, catchAsync(createOrg));
router.post('/login-org', guest, catchAsync(orglogIn));

router.patch('/org/:id', authAccount, cloudinary, multerUploadSingle, catchAsync(orgProfileUpdate));

router.delete('/org/:id', authAccount, catchAsync(deleteOrg));

router.get('/org/:id', catchAsync(viewOrgProfile));

export default router;
