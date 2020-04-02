/* eslint-disable */
const fs = require("fs");
const _ = require("lodash");

const dotenvPaths = [
  ".env.test.local",
  ".env.development.local",
  ".env.production.local",
  ".env.local",
  ".env.test",
  ".env.development",
  ".env.production",
  ".env",
];

const dotenvPathCandidates = (() => {
  const nodeEnv = process.env.NODE_ENV;
  if (!nodeEnv) return dotenvPaths;
  return _.filter(dotenvPaths, (i) => i === ".env.local" || i === ".env" || _.includes(i, nodeEnv));
})();

const dotenvPath = _.find(dotenvPathCandidates, (fileName) => fs.existsSync(fileName) && fs.statSync(fileName).size);
if (dotenvPath) require("dotenv").config({ path: dotenvPath });

const config = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
  logging: process.env.TYPEORM_LOGGING,
  entities: ["dist/**/*.entity.js"],
  seeds: ["dist/seeds/**/*.seed.js"],
  migrations: ["dist/migrations/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  cli: {
    entitiesDir: process.env.ENTITIES_DIR,
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
};

if (process.env.NODE_ENV === "production") {
  config["extra"] = {
    ssl: false,
  };
}

module.exports = config;
