import { reject } from "lodash";
import snowflake, { Connection } from "snowflake-sdk";
import { getConfig } from "../utils/config";

const dbConfig = {
  account: getConfig("dbAccount") || "",
  username: getConfig("dbUser") || "",
  password: getConfig("dbPassword") || "",
  database: getConfig("dbName") || "",
  role: getConfig("dbRole") || "",
  schema: getConfig("dbSchema") || "",
  warehouse: getConfig("dbWarehouse") || "",
  clientSessionKeepAlive: true,
};

console.log({ dbConfig });

const db: { connection: Connection | null } = { connection: null };

export const initDb = () =>
  new Promise((resolve, reject) => {
    const connection = snowflake.createConnection(dbConfig);
    connection.connect((err, result) => {
      if (err) {
        console.error("Failed to connect to database.");
        console.error(err);
        reject(err);
      } else {
        console.log("database connection successful");
        db.connection = connection;
        resolve(true);
      }
    });
  });

export const getDb = async () => {
  if (!db.connection) {
    console.log("not connected.");
    await initDb();
  }
  return db.connection;
};
