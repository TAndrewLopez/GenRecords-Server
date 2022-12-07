const conn = require("../conn");

const {
  Sequelize: { STRING, INTEGER, BOOLEAN },
} = conn;

const Track = conn.define("track", {
  name: {
    type: STRING,
    allowNull: false,
  },
  spotifyId: {
    type: STRING,
    allowNull: false,
  },
  length: {
    type: INTEGER,
    allowNull: false,
  },
  explicit: {
    type: BOOLEAN,
    defaultValue: false,
  },
  preview: {
    type: STRING,
    defaultValue: null,
  },
});

module.exports = Track;
