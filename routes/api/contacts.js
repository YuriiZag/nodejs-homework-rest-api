const express = require("express");

const { requestValidation } = require("../../middlewares/validationMiddleware");
const { asyncWraper } = require("../../helpers/apiHelpers");

const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateFavoriteStatusController,
} = require("../../controllers/contactControllers");
const { tokenCheckout } = require("../../middlewares/tokenCheckoutMiddleware");


const router = express.Router();

router.get("/",tokenCheckout, asyncWraper(listContactsController));

router.get("/:contactId", tokenCheckout, asyncWraper(getContactByIdController));

router.post(
  "/",
  requestValidation,
  tokenCheckout,
  asyncWraper(addContactController)
);

router.delete(
  "/:contactId",
  tokenCheckout,
  asyncWraper(removeContactController)
);

router.put(
  "/:contactId",
  tokenCheckout,
  requestValidation,
  asyncWraper(updateContactController)
);

router.patch("/:contactId", asyncWraper(updateFavoriteStatusController));

module.exports = router;
