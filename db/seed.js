const { conn, User } = require("./");
const { randomUsers, specificUsers } = require("./dummyData.json");

const seed = async () => {
  try {
    console.log("Seeding started.");
    await conn.sync({ force: true });
    //DO THE THINGS
    await Promise.all(specificUsers.map((user) => User.create(user)));
    await Promise.all(randomUsers.map((user) => User.create(user)));
    console.log("Seeding successful.");
  } catch (error) {}
};

module.exports = seed;
