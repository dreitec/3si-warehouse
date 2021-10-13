import snowflake from "snowflake-sdk";

import { getConfig } from "../utils/config";

const dbConfig = {
  account: getConfig("dbAccount"),
  username: getConfig("dbUser"),
  password: getConfig("dbPassword"),
  database: getConfig("dbName"),
  role: getConfig("dbRole"),
  schema: getConfig("dbSchema"),
  warehouse: getConfig("dbWarehouse"),
};

console.log({ dbConfig });

const db = { connection: null };

export const initDb = () => {
  const connection = snowflake.createConnection(dbConfig);
  connection.connect((err, result) => {
    if (err) {
      console.error("Failed to connect to database.");
      console.error(err);
    } else {
      console.log("database connection successful");
      db.connection = connection;
    }
  });
};

export const getDb = () => db.connection;
