const config = {
  dbAccount: "mu14029.us-east-2.aws",
  dbUser: "TEST_USER",
  dbPassword: process.env.DB_PASSWORD,
  dbName: "ELDS_TEST",
  dbRole: "APP_USER",
  dbSchema: "ELDS",
  dbWarehouse: "COMPUTE_WH",
};

export const getConfig = (key: keyof typeof config) => {
  if (config[key]) return config[key];
};
