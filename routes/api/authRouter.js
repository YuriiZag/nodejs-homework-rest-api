const express = require("express");

const { authValidation, emailResendValidation } = require("../../middlewares/validationMiddleware");
const { asyncWraper } = require("../../helpers/apiHelpers");
const {
  registerController,
  loginController,
  logoutController,
  currentUserController,
  avatarChangeController,
  verificationMailCheckerController,
  resendEmailController,
} = require("../../controllers/userController");
const { tokenCheckout } = require("../../middlewares/tokenCheckoutMiddleware");
const { uploadMiddleware } = require("../../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/register", authValidation, asyncWraper(registerController));
router.post("/login", authValidation, asyncWraper(loginController));
router.post("/logout", tokenCheckout, asyncWraper(logoutController));
router.post("/users/verify", emailResendValidation, asyncWraper(resendEmailController));
router.get("/current", tokenCheckout, asyncWraper(currentUserController));
router.get("/verify/:verificationToken", asyncWraper(verificationMailCheckerController));
router.get("/current", tokenCheckout, asyncWraper(currentUserController))
router.patch("/avatars", tokenCheckout, uploadMiddleware.single('avatar'), asyncWraper(avatarChangeController))

module.exports = router;
