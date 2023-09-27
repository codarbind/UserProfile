module.exports = {
  rootDir: __dirname,
  moduleNameMapper: {
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },
};
