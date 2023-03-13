const { User } = require("../db/userModel");
const { UnauthorizedError, ConflictError } = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const registerHandler = async ({
  email,
  password,
  subscription = "starter",
}) => {
  const user = new User({
    email,
    password,
    subscription,
    verificationToken: uuidv4(),
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
  if (user.verify === false) {
    throw new UnauthorizedError("Your email isn't verified");
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

const verificationMailSendler = async (verificationToken) => {};

const resendEmailHandler = async (email) => {};

module.exports = {
  registerHandler,
  loginHandler,
  logoutHandler,
  currentUser,
  verificationMailSendler,
};
