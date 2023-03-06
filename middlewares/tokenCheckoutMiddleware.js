const { UnauthorizedError } = require("../helpers/errors");
const jwt = require("jsonwebtoken");

const tokenCheckout = (req, res, next) => {
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (!token) {
    next(new UnauthorizedError("Please, provide a token"));
  } else {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      next(new UnauthorizedError("Please, provide a token"));
    } else {
      req.token = token;
      req.userId = user;

      next();
    }
  }
};

module.exports = { tokenCheckout };
