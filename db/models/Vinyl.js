const conn = require("../conn");

const {
  Sequelize: { STRING, BOOLEAN, INTEGER },
} = conn;

const Vinyl = conn.define("vinyl", {
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
    defaultValue: 0,
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
});

/*
  {
    hooks: {
      afterUpdate: async (product) => {
        const items = await product.getLineItems();
        await Promise.all(
          items
            .filter((item) => item.qty > product.stock)
            .map((item) => {
              item.update({ qty: product.stock });
            })
        );
      },
    }
  }
*/

module.exports = Vinyl;
