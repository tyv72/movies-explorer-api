const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  PORT: process.env.PORT || 3009,
  DBADDRESS: process.env.DBADDRESS || 'mongodb://localhost:27017/bitfilmsdb',
};

module.exports = config;
