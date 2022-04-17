import { Router } from 'express';

import { makeRegisterUserController } from '@/main/factories';

import { adaptRoute } from '../adapters/express-route-adapter';

const router = Router();

router.post('/', adaptRoute(makeRegisterUserController()));

export default router;
