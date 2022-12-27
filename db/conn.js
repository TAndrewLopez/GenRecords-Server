const Sequelize = require("sequelize");

// const config = {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: process.env.DATABASE_URL
//       ? { require: true, rejectUnauthorized: false }
//       : false,
//   },
//   logging: false,
// };

// const conn = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost:5432/recordShop",
//   null,
//   null,
//   config
// );

const conn = new Sequelize({
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
});

module.exports = conn;

// const conn = new Sequelize({
//   database: "genRecords_server",
//   username: "tandrewlopez",
//   password: "FREE123",
//   host: "mydatabase-instance.cyrkvzihboei.us-east-1.rds.amazonaws.com",
//   port: 5432,
//   dialect: "postgres",
//   dialectModule: pg,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
