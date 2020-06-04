import { Router } from 'express';
import { acceptRejectUserProduct } from '../controllers';
import {
  catchAsync, authOrg
} from '../middleware';

const router = Router();

router.post('/status/:productId', authOrg, catchAsync(acceptRejectUserProduct));


export default router;
