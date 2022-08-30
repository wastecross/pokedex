export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  defaultLimit: process.env.DEFAULT_LIMIT || 7,
});
