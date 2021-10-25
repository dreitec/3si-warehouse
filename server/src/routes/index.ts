import { Router } from "express";

import { ping } from "../controllers/test";
import {
  getOneChild,
  getAllChildren,
  getChildrenEligibility,
  getChildrenServed,
  getGeographicalElgibility,
  getGeographicalServed,
} from "../controllers/children";
import { getProvidersGraph, getProvidersTable } from "../controllers/providers";

export const routes = new Router();

const addRoute = (path, handler) => {
  routes.get(path, (req, res) => {
    const result = handler(req, res);
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
addRoute("/providers/chart", getProvidersGraph);
addRoute("/providers/table", getProvidersTable);

addRoute("/children", getAllChildren);
addRoute("/child", getOneChild);

addRoute("/children/eligibility", getChildrenEligibility);
addRoute("/children/served", getChildrenServed);
addRoute("/children/eligibility/geographical", getGeographicalElgibility);
addRoute("/children/served/geographical", getGeographicalServed);
