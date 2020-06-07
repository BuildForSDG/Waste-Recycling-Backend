
import { Router } from 'express';
import { orgPostProduct } from '../controllers';
import {
  catchAsync, authOrg, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/org-product', authOrg, cloudinary, multerUploadSingle, catchAsync(orgPostProduct));

export default router;
