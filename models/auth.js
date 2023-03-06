const { User } = require("../db/userModel");
const { UnauthorizedError, ConflictError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerHandler = async ({
  email,
  password,
  subscription = "starter",
}) => {
  const user = new User({
    email,
    password,
    subscription,
  });
  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError(`email ${email} is already in use`);
    }
  }
  return user;
};

const loginHandler = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError(`No user with email: ${email} has been found`);
  }
  const comparation = await bcrypt.compare(password, user.password);

  if (!comparation) {
    throw new UnauthorizedError("Wrong password");
  }

  const token = await jwt.sign(user._id.toString(), process.env.JWT_SECRET);
  await User.findByIdAndUpdate(user._id.toString(), { $set: { token } });
  return token;
};

const logoutHandler = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new UnauthorizedError(`No user authorised`);
  }
  await User.findByIdAndUpdate(userId, { $set: { token: "" } });
};

const currentUser = async (userId) => {
  console.log(userId);
  const user = await User.findById(userId);

  if (!user) {
    throw new UnauthorizedError(`No user authorised`);
  }
  return user;
};

module.exports = { registerHandler, loginHandler, logoutHandler, currentUser };
