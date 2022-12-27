const Sequelize = require("sequelize");

const config = {
  dialect: "postgres",
  logging: false,
};

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: process.env.DATABASE_URL
      ? { require: true, rejectUnauthorized: false }
      : false,
  };
}

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/recordShop",
  null,
  null,
  config
);

module.exports = conn;
