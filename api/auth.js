const router = require("express").Router();
const cookie = require("cookie");
const { User } = require("../db");
const { requireToken, isAdmin } = require("./middleware");

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "username",
        "email",
        "isAdmin",
      ],
    });
    users.sort((a, b) => a.id - b.id);
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
});

router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { firstName, lastName, username, email, password, img } = req.body;
    await user.update({ firstName, lastName, username, email, password, img });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireToken, async (req, res, next) => {
  try {
    const { id, firstName, lastName, username, email, isAdmin } = req.user;
    return res
      .status(200)
      .json({ id, firstName, lastName, username, email, isAdmin });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await User.authenticate({ username, password });
    return res.status(202).json({ authorization: token });
  } catch (error) {
    return next(error);
  }
});

router.post("/signUp", async (req, res, next) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      firstName,
      lastName,
    });

    return res.status(201).json({ authorization: user.generateToken() });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

module.exports = router;
