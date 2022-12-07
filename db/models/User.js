const conn = require("../conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
  Sequelize: { STRING, BOOLEAN },
} = conn;

const User = conn.define("user", {
  firstName: {
    type: STRING,
    allowNull: false,
  },
  lastName: {
    type: STRING,
    allowNull: false,
  },
  username: {
    type: STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

//INSTANCE METHODS
User.prototype.generateToken = function () {
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
    id: this.id,
  });
};

//CLASS METHODS
User.findByToken = async (token) => {
  try {
    const tempId = token;
    // const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(tempId);
    if (!user) {
      throw "";
    }
    return user;
  } catch (err) {
    const error = Error("Unauthorized");
    error.status = 401;
    throw error;
  }
};

//HOOKS
const SALT_ROUNDS = 5;

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPassword;
});
module.exports = User;

User.beforeUpdate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPassword;
});
