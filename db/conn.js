const Sequelize = require("sequelize");

const config = {
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.DATABASE_URL
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
  logging: false,
};

const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/recordShop",
  null,
  null,
  config
);

module.exports = conn;
