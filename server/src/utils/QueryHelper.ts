import { getDb } from "../data";

/**
 * Promisify snowflake queries to use cleaner async/await syntax
 * @param query - sql query
 * @returns - Results of query
 */
const PormisifiedQuery = (query) =>
  new Promise((resolve, reject) => {
    const db = getDb();
    if (!db) {
      reject("Could not connect to database");
    }

    (db as any).execute({
      sqlText: query,
      complete: (err, statement, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(rows);
      },
    });
  });

export default PormisifiedQuery;
