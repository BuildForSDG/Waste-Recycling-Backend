import { Router } from 'express';
import { createUser } from '../controllers';
import { catchAsync, guest } from '../middleware';

const router = Router();

router.post('/create-user', guest, catchAsync(createUser));

export default router;
