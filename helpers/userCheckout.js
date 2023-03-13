const { UnauthorizedError } = require("./errors");
const { User } = require("../db/userModel");

const userCheckoutById = async (userId) => {
const user = await User.findById(userId);
  if (!user) {
    throw new UnauthorizedError(`No user authorised`);
    }
    return user
}

const userCheckoutByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthorizedError(`No user with email: ${email} has been found`);
  }
  return user;
};

module.exports = {userCheckoutByEmail, userCheckoutById}