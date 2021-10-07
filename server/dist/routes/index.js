"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_1 = require("../controllers/test");
const children_1 = require("../controllers/children");
const providers_1 = require("../controllers/providers");
exports.routes = new express_1.Router();
const addRoute = (path, handler) => {
    exports.routes.get(path, (req, res) => {
        const result = handler();
        if (result.then) {
            result.then((fulfilled) => res.status(200).json(fulfilled));
        }
        else {
            res.status(200).json(result);
        }
    });
};
addRoute('/ping', test_1.ping);
addRoute('/providers', providers_1.getProviders);
addRoute('/children/text', children_1.getOneChild);
//# sourceMappingURL=index.js.map