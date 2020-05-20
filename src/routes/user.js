import { Router } from 'express';
import { createUser, signIn } from '../controllers';
import { catchAsync, guest } from '../middleware';

const router = Router();

router.post('/create-user', guest, catchAsync(createUser));
router.post('/login', guest, catchAsync(signIn));

export default router;
