const config = {
  dbAccount: 'mu14029.us-east-2',
  dbUser: 'TEST_USER',
  dbPassword: '',
};

export const getConfig = (key: string) => config?.[key] || '';
