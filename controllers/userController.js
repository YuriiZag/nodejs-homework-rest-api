const {
  registerHandler,
  loginHandler,
  logoutHandler,
  currentUser,
  avatarChangeHandler,
  resendEmailHandler,
  verificationMailChecker,
} = require("../models/auth");

const registerController = async (req, res) => {
  const user = await registerHandler(req.body)
  res
    .status(201)
    .json({ user: { email: user.email, subscription: user.subscription } });
};

const loginController = async (req, res) => {
  const token = await loginHandler(req.body);

  res.json({ status: "success", token: token });
};

const logoutController = async (req, res) => {
  console.log(req.userId);
  await logoutHandler(req.userId);

  res.status(204).json({status: "success"});
};

const currentUserController = async (req, res) => {
  console.log(req.userId);
  const user = await currentUser(req.userId);
  
  res.json({ user: { email: user.email, subscription: user.subscription } });
}; 

const avatarChangeController = async (req, res) => {
  
  const { originalname } = req.file;
  const avatarPath = await avatarChangeHandler(originalname, req.userId);
  res.json({ avatarPath: avatarPath });
};

const verificationMailCheckerController = async (req, res) => {
  verificationMailChecker(req.params.verificationToken);
  res.json({message: "Verification successfull"})
}

const resendEmailController = async (req, res) => {
  resendEmailHandler(req.body);
  res.json({ message: "Verification email sent" });
}



module.exports = {
  registerController,
  loginController,
  currentUserController,
  logoutController,
  verificationMailCheckerController,
  resendEmailController,
  avatarChangeController
};
