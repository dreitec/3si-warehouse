import { Router } from "express";

import { ping } from "../controllers/test";
import {
  getOneChild,
  getAllChildren,
  getAllChildrenForLastYear,
} from "../controllers/children";
import { getProviders } from "../controllers/providers";

export const routes = new Router();

const addRoute = (path, handler) => {
  routes.get(path, (req, res) => {
    const result = handler();
    if (result.then) {
      result.then((fulfilled) => {
        return res.send(fulfilled);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

addRoute("/ping", ping);
addRoute("/providers", getProviders);
addRoute("/children", getAllChildren);
addRoute("/child", getOneChild);

addRoute("/children/year", getAllChildrenForLastYear);
