const router = require("express").Router();

router.get("/", (req, res, next) => {
  try {
    return res.status(200).json({ message: "Pinged Auth" });
  } catch (error) {
    next(error);
  }
});

//ROUTER POST LOGIN
//ROUTER POST SIGNUP

module.exports = router;
