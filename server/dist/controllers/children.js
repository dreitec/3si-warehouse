"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../data");
exports.getOneChild = () => {
    const db = data_1.getDb();
    if (!db) {
        throw new Error('Could not connect to database');
    }
    return new Promise((resolve, reject) => {
        db.execute({
            sqlText: 'select * from CHILDREN LIMIT 1',
            complete: (err, statement, rows) => {
                if (err) {
                    throw new Error(err);
                }
                resolve({ rows });
            }
        });
    });
};
//# sourceMappingURL=children.js.map