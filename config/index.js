const devConfig = {
  DB_URL: process.env.DB_URL + '-dev',
  JWT_SECRET: process.env.JWT_SECRET,
};

const tesConfig = {
  DB_URL: process.env.DB_URL + '-test',
};

const prodConfig = {
  DB_URL: process.env.DB_URL + '-prod',
};

const defaultConfig = {
  PORT: process.env.PORT,
};

const envConfig = env => {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return tesConfig;
    case 'production':
      return prodConfig;
    default:
      return defaultConfig;
  }
};

module.exports = {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
