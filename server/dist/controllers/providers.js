"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
exports.getProviders = () => {
    const db = data_1.getDb();
    if (!db) {
        throw new Error('Could not connect to database');
    }
    return new Promise((resolve, reject) => {
        db.execute({
            sqlText: 'select * from PROVIDERS',
            complete: (err, statement, rows) => {
                if (err) {
                    throw new Error(err);
                }
                resolve({ rows });
            }
        });
    });
};
//# sourceMappingURL=providers.js.map