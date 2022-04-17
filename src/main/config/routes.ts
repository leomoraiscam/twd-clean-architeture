import { Router } from 'express';

import registerRouter from '../routes/register-route';

const routes = Router();

routes.use('/api/register', registerRouter);

export default routes;
