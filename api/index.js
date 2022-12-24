const router = require("express").Router();

router.use("/stripe", require("./stripe"));
router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"));
router.use("/shop", require("./shop"));

router.use(function (req, res, next) {
  const err = new Error("Not found.");
  err.status = 404;
  next(err);
});

module.exports = router;
