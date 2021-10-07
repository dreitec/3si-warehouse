const config = {
  dbAccount: 'mu14029.us-east-2',
  dbUser: 'TEST_USER',
  dbPassword: process.env.DB_PASSWORD,
  dbName: 'ELDS_TEST',
  dbSchema: 'ELDS',
  dbWarehouse: 'COMPUTE_WH',
};

console.log(`config: ${JSON.stringify(config)}`);

export const getConfig = (key: string) => config?.[key] || '';
