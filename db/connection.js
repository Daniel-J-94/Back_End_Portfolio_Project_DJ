const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DB_URL) {
  throw new Error("PGDATABASE or DB_ URL not set");
}

const config =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DB_URL,
        max: 2,
      }
    : {};

//  forced change
module.exports = new Pool(config);
