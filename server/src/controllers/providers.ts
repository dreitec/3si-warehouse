import { getDb } from "../data";

export const getProviders = () => {
  const db = getDb();
  if (!db) {
    throw new Error("Could not connect to database");
  }
  return new Promise((resolve, reject) => {
    (db as any).execute({
      sqlText: "select * from elds_test.elds.providers",
      complete: (err, statement, rows) => {
        if (err) {
          throw new Error(err);
        }
        resolve({ rows });
      },
    });
  });
};
