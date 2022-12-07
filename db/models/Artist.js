const conn = require("../conn");

const {
  Sequelize: { STRING },
} = conn;

const Artist = conn.define("artist", {
  name: {
    type: STRING,
    notNull: true,
  },
  spotifyId: {
    type: STRING,
  },
  genre: {
    type: STRING,
    defaultValue: "",
  },
});

module.exports = Artist;

/*
  img: {
    type: STRING,
    defaultValue: "/artist-default.jpg",
  },
*/
