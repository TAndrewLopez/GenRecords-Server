const { conn, User } = require("./");

const seed = async () => {
  try {
    console.log("Seeding started.");
    await conn.sync({ force: true });

    //DO THE THINGS
    const admin = await User.create({
      username: "administrator",
      password: "adminPassword",
      email: "admin@genrecords.com",
      firstName: "Andrew",
      lastName: "Dobson",
      isAdmin: true,
    });
    await conn.close();
    console.log("Seeding successful.");
  } catch (error) {}
};

module.exports = seed;
