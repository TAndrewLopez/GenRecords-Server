const router = require("express").Router();
const { requireToken, isAdmin } = require("./middleware");
const { User } = require("../db");
const cookie = require("cookie");

router.get("/", requireToken, async (req, res) => {
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

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await User.authenticate({ username, password });
    return res.status(202).json({ authorization: token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      firstName,
      lastName,
    });
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
