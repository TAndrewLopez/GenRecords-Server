const Sequelize = require("sequelize");
const pg = require("pg");

const config = {
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.DATABASE_URL
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
  logging: false,
};
let conn;
if (process.env.PRODUCTION) {
  conn = new Sequelize({
    database: process.env.DATABASE,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: 5432,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  conn = new Sequelize(
    process.env.DATABASE_URL || "postgres://localhost:5432/recordShop",
    config
  );
}

module.exports = conn;
