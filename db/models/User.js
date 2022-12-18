const conn = require("../conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Order = require("./Order");
const {
  Sequelize: { STRING, BOOLEAN },
} = conn;

const User = conn.define("user", {
  firstName: {
    type: STRING,
    defaultValue: "New",
  },
  lastName: {
    type: STRING,
    defaultValue: "User",
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
  img: {
    type: STRING,
    validate: {
      isUrl: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

//INSTANCE METHODS
User.prototype.correctPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      id: this.id,
    },
    process.env.JWT
  );
};

//CLASS METHODS
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });

  //TODO: RETURNS THE STATUS BUT NOT THE ERROR OBJECT
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect Credentials.");
    error.status = 401;
    throw error;
  }

  return user.generateToken();
};

User.findByToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      throw "";
    }
    return user;
  } catch (err) {
    const error = Error("Unauthorized.");
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

User.beforeUpdate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPassword;
});

User.afterCreate(async (user) => {
  const order = Order.create({ userId: user.id });
});

module.exports = User;
