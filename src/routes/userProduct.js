import { Router } from 'express';
import {
  userPostProduct, userViewAllProducts, userViewProduct, rejectAccept
} from '../controllers';
import {
  catchAsync, auth, cloudinary, multerUploadSingle
} from '../middleware';

const router = Router();

router.post('/user-product/:productId', auth, cloudinary, multerUploadSingle, catchAsync(userPostProduct));

router.get('/user-product', catchAsync(userViewAllProducts));
router.get('/user-product/:productId', catchAsync(userViewProduct));
router.get('/user-product/status/:status', catchAsync(rejectAccept));

export default router;
