import { getDb } from "../data";

/**
 * Promisify snowflake queries to use cleaner async/await syntax
 * @param query - sql query
 * @returns - Results of query
 */
const PormisifiedQuery = (query: string) =>
  new Promise(async (resolve, reject) => {
    const db = await getDb();

    if (!db) {
      reject("Could not connect to database");
    }

    (db as any).execute({
      sqlText: query,
      complete: (err: any, _: any, rows: any[]) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(rows);
      },
    });
  });

export default PormisifiedQuery;
