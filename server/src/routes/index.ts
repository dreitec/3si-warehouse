import { Router } from 'express';

import { ping } from '../controllers/test';
import { getOneChild } from '../controllers/children';
import { getProviders } from '../controllers/providers';

import childrenRoutes from './children.router'

export const routes = new Router();

const addRoute = (path, handler) => {
  routes.get(path, (req, res) => {
    const result = handler();
    if (result.then) {
      result.then((fulfilled) => res.status(200).json(fulfilled));
    } else {
      res.status(200).json(result);
    }
  })
}

addRoute('/ping', ping);
addRoute('/providers', getProviders);
addRoute('/children/test', getOneChild);
routes.use('/children', childrenRoutes)
