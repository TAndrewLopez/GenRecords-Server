const conn = require("../conn");

const {
  Sequelize: { BOOLEAN },
} = conn;

const Order = conn.define("order", {
  complete: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
