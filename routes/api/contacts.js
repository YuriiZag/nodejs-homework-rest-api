const { requestValidation } = require("../../middlewares/validationMiddleware");
const express = require("express");

const { listContactsController, getContactByIdController, addContactController, removeContactController, updateContactController, updateFavoriteStatusController } = require("../../controllers/contactControllers");
const { asyncWraper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWraper(listContactsController));

router.get("/:contactId", asyncWraper(getContactByIdController));

router.post("/", requestValidation, asyncWraper(addContactController));

router.delete("/:contactId", asyncWraper(removeContactController));

router.put(
  "/:contactId",
  requestValidation,
  asyncWraper(updateContactController)
);

router.patch("/:contactId", asyncWraper(updateFavoriteStatusController));

module.exports = router;
