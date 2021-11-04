import { Router } from "express";

import { ping } from "../controllers/test";
import {
  getChildrenEligibility,
  getChildrenServed,
  getGeographicalElgibility,
  getGeographicalServed,
  getScatterUnserved,
  getGeographicalUnserved,
  getChildrenTableData,
  getChildrensCSV,
} from "../controllers/children";
import {
  getProvidersGraph,
  getProvidersTable,
  getProvidersTableExportData,
  getProvidersCSV,
} from "../controllers/providers";

export const routes = new Router();

const addRoute = (path, handler) => {
  routes.get(path, (req, res) => {
    const result = handler(req, res);
    if (result.then) {
      result.then((fulfilled) => {
        if (fulfilled.type === "file") {
          return res.download(fulfilled.path);
        }
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

addRoute("/children/eligibility", getChildrenEligibility);
addRoute("/children/served", getChildrenServed);
addRoute("/children/eligibility/geographical", getGeographicalElgibility);
addRoute("/children/served/geographical", getGeographicalServed);
addRoute("/children/unserved/scatter", getScatterUnserved);
addRoute("/children/unserved/geographical", getGeographicalUnserved);

addRoute("/table/children", getChildrenTableData);
addRoute("/table/providers", getProvidersTableExportData);

addRoute("/csv/providers", getProvidersCSV);
addRoute("/csv/children", getChildrensCSV);
