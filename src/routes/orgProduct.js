
import { Router } from 'express';
import { orgPostProduct } from '../controllers';
import {
  catchAsync, auth, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/org-product', auth, cloudinary, multerUploadSingle, catchAsync(orgPostProduct));

export default router;
