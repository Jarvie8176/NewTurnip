const fs = require('fs');
const ENVIRONMENT = process.env.NODE_ENV || 'development';
const fileName = `.env.${ENVIRONMENT}`;

console.log("foo")

if (fs.existsSync(fileName)) {
  require('dotenv').config({path: fileName});
} else {
  require('dotenv').config({path: ".env.example"});
}
const database = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: process.env.DATABASE_SYNCHRONIZE,
  logging: process.env.DATABASE_LOGGING
};
const config = {
  "type": database.type,
  "host": database.host,
  "port": database.port,
  "username": database.username,
  "password": database.password,
  "database": database.database,
  "synchronize": database.synchronize,
  "logging": database.logging,
  "entities": [
    "dist/entity/**/*.js"
  ],
  "seeds": [
    "dist/seeds/**/*.seed.js"
  ],
  "migrations": [
    "dist/migration/**/*.js"
  ],
  "subscribers": [
    "dist/subscriber/**/*.js"
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
};

if (process.env.NODE_ENV === 'production') {
  config['extra'] = {
    ssl: true
  }
}
module.exports = config;
