"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const PORT = 5000;
const SERVER_VERSION = '0';
const app = express_1.default();
app.use(cors_1.default());
app.use(`/v${SERVER_VERSION}`, routes);
app.use(errorHandlers);
const launch = () => {
    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
};
launch();
//# sourceMappingURL=index.js.map