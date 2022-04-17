import express from 'express';

import routes from '@/main/config/routes';

import setupMiddleware from './middleware';

const app = express();

setupMiddleware(app);
app.use(routes);

export default app;
