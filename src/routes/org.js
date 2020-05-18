import { Router } from 'express';
import { createOrg } from '../controllers';
import { catchAsync, guest } from '../middleware';

const router = Router();

router.post('/create-org', guest, catchAsync(createOrg));

export default router;
