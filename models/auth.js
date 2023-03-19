const { User } = require("../db/userModel");
const {
  UnauthorizedError,
  ConflictError,
  AuthorizedStateError,
  UnexistedTokenError,
} = require("../helpers/errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const {
  userCheckoutById,
  userCheckoutByEmail,
} = require("../helpers/userCheckout");
const nodemailer = require("nodemailer");
const fs = require("fs").promises;

const registerHandler = async ({
  email,
  password,
  subscription = "starter",
}) => {
  const avatarUrl = await gravatar.url(email);
  const user = new User({
    email,
    password,
    subscription,
    verificationToken: uuidv4(),
    avatarUrl,
  });

  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new ConflictError(`email ${email} is already in use`);
    }
  }
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "yuriizahrai@meta.ua",
      pass: process.env.PASSWORD,
    },
  };
  const emailOptions = {
    from: "yuriizahrai@meta.ua",
    to: `${email}`,
    subject: "Email confirmation",
    text: `http://localhost:3000/api/users/verify/:${user.verificationToken}`,
    html: `<a href="http://localhost:3000/api/users/verify/:${user.verificationToken}">Confirmation link</a>`,
  };
  const transporter = nodemailer.createTransport(config);
  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  return user;
};

const loginHandler = async ({ email, password }) => {
  const user = await userCheckoutByEmail(email);
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
  await userCheckoutById(userId);
  await User.findByIdAndUpdate(userId, { $set: { token: "" } });
};

const currentUser = async (userId) => {
  const user = await userCheckoutById(userId);
  return user;
};
const avatarChangeHandler = async (originalname, userId) => {
  const uploadedPicPath = path.resolve(`./tmp/${originalname}`);
  const avatarName = userId + "-" + originalname;
  const user = await userCheckoutById(userId);
  await User.findByIdAndUpdate(user._id.toString(), {
    $set: { avatarUrl: `./public/avatars/${avatarName}` },
  });
  Jimp.read(uploadedPicPath, (err, picture) => {
    if (err) {
      console.log(err.message);
    }
    picture
      .resize(250, 250)
      .write(path.resolve(`./public/avatars/${avatarName}`));
  });
  fs.unlink(uploadedPicPath);
  return `/api/avatars/${avatarName}`;
};

const verificationMailChecker = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new UnexistedTokenError("User not found");
  }
  console.log(user.id);
  await User.findByIdAndUpdate(user._id, {
    $set: {
      verify: true,
    },
  });
};

const resendEmailHandler = async (email) => {
  const user = await userCheckoutByEmail(email);
  if (user.verify === true) {
    throw new AuthorizedStateError(`Verification has already been passed`);
  }
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "yuriizahrai@meta.ua",
      pass: process.env.PASSWORD,
    },
  };
  const emailOptions = {
    from: "yuriizahrai@meta.ua",
    to: `${email}`,
    subject: "Email confirmation",
    text: `http://localhost:3000/api/users/verify/:${user.verificationToken}`,
    html: `<a href="http://localhost:3000/api/users/verify/:${user.verificationToken}">Confirmation link</a>`,
  };
  const transporter = nodemailer.createTransport(config);
  transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
  return user;
};

module.exports = {
  registerHandler,
  loginHandler,
  logoutHandler,
  currentUser,
  verificationMailChecker,
  avatarChangeHandler,
  resendEmailHandler,
};
