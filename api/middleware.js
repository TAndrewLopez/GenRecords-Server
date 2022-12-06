const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    return console.log("success");
  } catch (error) {
    next(error);
  }
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
