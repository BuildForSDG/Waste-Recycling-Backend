import { Router } from 'express';
import { userPostProduct } from '../controllers';
import {
  catchAsync, auth, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/user-product/:productId', auth, cloudinary, multerUploadSingle, catchAsync(userPostProduct));

export default router;
