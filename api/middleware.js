const { User } = require("../db");

const requireToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const user = await User.findByToken(authorization);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.sendStatus(403);
  }
  next();
};

module.exports = { requireToken, isAdmin };
