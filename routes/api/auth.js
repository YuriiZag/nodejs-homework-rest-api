const express = require("express");

const { authValidation } = require("../../middlewares/validationMiddleware");
const { asyncWraper } = require("../../helpers/apiHelpers");
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  verificationMailSendlerController,
} = require("../../controllers/userController");
const { tokenCheckout } = require("../../middlewares/tokenCheckoutMiddleware");

const router = express.Router();

router.post("/register", authValidation, asyncWraper(registerController));
router.post("/login", authValidation, asyncWraper(loginController));
router.post("/logout", tokenCheckout, asyncWraper(logoutController));
router.post("/users/verify", asyncWraper());
router.get("/current", tokenCheckout, asyncWraper(currentUserController));
router.get("/verify/:verificationToken", asyncWraper(verificationMailSendlerController));

module.exports = router;
