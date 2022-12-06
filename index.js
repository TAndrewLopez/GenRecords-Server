const port = process.env.PORT || 7000;
const app = require("./app");

const init = async () => {};
try {
  //   process.env.SEED ? await seed() : await conn.sync();
  app.listen(port, () => console.log(`listening on port ${port}`));
} catch (error) {
  console.error(error);
}

init();
