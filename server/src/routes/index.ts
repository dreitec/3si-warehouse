import { Router } from 'express';

import { ping } from '../controllers/test';

export const routes = new Router();

routes.get('/ping', (req, res) => {
  console.log('ping!');
  res.status(200).json(ping());
});
