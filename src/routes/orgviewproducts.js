import { Router } from 'express';
import { ViewAllProducts, viewOneProduct } from '../controllers';
import {
  catchAsync, authOrg
} from '../middleware';

const router = Router();

router.get('/products', authOrg, catchAsync(ViewAllProducts));
router.get('/product/:id', authOrg, catchAsync(viewOneProduct));


export default router;
