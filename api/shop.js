const router = require("express").Router();
const { Artist, Vinyl } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const vinyls = await Vinyl.findAll({
      include: Artist,
    });
    vinyls.sort((a, b) => a.id - b.id);
    return res.status(200).json({ vinyls });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
