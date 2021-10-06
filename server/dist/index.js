"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const errors_1 = require("./utils/errors");
const PORT = 5000;
const SERVER_VERSION = '0';
const app = express_1.default();
app.use(cors_1.default());
app.use(`/v${SERVER_VERSION}`, (req, res, next) => {
    console.log('BARK');
    next();
});
app.use(`/v${SERVER_VERSION}`, routes_1.routes);
app.use(errors_1.notFoundHandler);
app.use(errors_1.errorHandler);
const launch = () => {
    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
};
launch();
//# sourceMappingURL=index.js.map