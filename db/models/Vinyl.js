const conn = require("../conn");

const {
  Sequelize: { STRING, BOOLEAN, INTEGER },
} = conn;

const Vinyl = conn.define(
  "vinyl",
  {
    name: {
      type: STRING,
      allowNull: false,
    },
    price: {
      //ALLOW DECIMALS?
      type: INTEGER,
      allowNull: false,
    },
    stock: {
      type: INTEGER,
      defaultValue: 10,
    },
    popularity: {
      type: INTEGER,
      defaultValue: 0,
    },
    img: {
      type: STRING,
      defaultValue:
        "https://thumbs.dreamstime.com/b/gold-record-music-disc-award-isolated-white-140630094.jpg",
    },
    releaseDate: {
      type: STRING,
      allowNull: false,
    },
    label: {
      type: STRING,
    },
    totalTrack: {
      type: INTEGER,
    },
    spotifyId: {
      type: STRING,
    },
  },
  {
    hooks: {
      afterUpdate: async (vinyl) => {
        const items = await vinyl.getLineItems();
        await Promise.all(
          items
            .filter((item) => item.qty > vinyl.stock)
            .map((item) => {
              item.update({ qty: vinyl.stock });
            })
        );
      },
    },
  }
);

module.exports = Vinyl;
