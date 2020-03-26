/* eslint-disable */
const fs = require("fs");
const _ = require("lodash");

const dotenvPaths = [
  ".env.development.local",
  ".env.production.local",
  ".env.local",
  ".env.development",
  ".env.production",
  ".env",
];
const dotenvPath = _.find(dotenvPaths, (fileName) => fs.existsSync(fileName) && fs.statSync(fileName).size);
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
  entities: process.env.ENTITIES,
  seeds: ["dist/seeds/**/*.seed.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  cli: {
    entitiesDir: process.env.ENTITIES_DIR,
    migrationsDir: process.env.MIGRATIONS_DIR,
    subscribersDir: "src/subscriber",
  },
};

if (process.env.NODE_ENV === "production") {
  config["extra"] = {
    ssl: true,
  };
}
module.exports = config;
