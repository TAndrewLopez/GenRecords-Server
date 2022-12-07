const { conn, User } = require("./");

const USERS = [
  {
    username: "administrator",
    password: "adminPassword",
    email: "admin@genRecords.com",
    firstName: "Andrew",
    lastName: "Dobson",
    isAdmin: true,
  },
];

const seed = async () => {
  try {
    console.log("Seeding started.");
    await conn.sync({ force: true });

    //DO THE THINGS
    const users = await Promise.all(USERS.map((user) => User.create(user)));
    console.log("Seeding successful.");
  } catch (error) {}
};

module.exports = seed;
