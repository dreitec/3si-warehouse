"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snowflake_sdk_1 = __importDefault(require("snowflake-sdk"));
const config_1 = require("../utils/config");
const dbConfig = {
    account: config_1.getConfig('dbAccount'),
    username: config_1.getConfig('dbUser'),
    password: config_1.getConfig('dbPassword'),
    database: config_1.getConfig('dbName'),
    schema: config_1.getConfig('dbSchema'),
    warehouse: config_1.getConfig('dbWarehouse'),
};
const db = { connection: null };
exports.initDb = () => {
    const connection = snowflake_sdk_1.default.createConnection(dbConfig);
    connection.connect((err, result) => {
        if (err) {
            console.error('Failed to connect to database.');
            console.error(err);
        }
        else {
            console.log('database connection successful');
            db.connection = connection;
        }
    });
};
exports.getDb = () => db.connection;
//# sourceMappingURL=index.js.map