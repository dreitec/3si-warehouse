"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    dbAccount: 'mu14029.us-east-2',
    dbUser: 'TEST_USER',
    dbPassword: process.env.DB_PASSWORD,
    dbName: 'ELDS_TEST',
    dbSchema: 'ELDS',
    dbWarehouse: 'COMPUTE_WH',
};
console.log(`config: ${JSON.stringify(config)}`);
exports.getConfig = (key) => (config === null || config === void 0 ? void 0 : config[key]) || '';
//# sourceMappingURL=config.js.map