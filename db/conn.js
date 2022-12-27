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
  process.env.DATABASE_URL || "postgres://localhost/recordShop",
  process.env.POSTGRES_USER || null,
  process.env.POSTGRES_PASSWORD || null,
  config
);

module.exports = conn;
