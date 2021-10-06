"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_1 = require("../controllers/test");
exports.routes = new express_1.Router();
exports.routes.get('/ping', (req, res) => {
    console.log('ping!');
    res.status(200).json(test_1.ping());
});
//# sourceMappingURL=index.js.map