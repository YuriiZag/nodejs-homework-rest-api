const { requestValidation } = require("../../middlewares/validationMiddleware");
const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact === undefined) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ contact });
});

router.post("/", requestValidation, async (req, res, next) => {
  const contact = await addContact(req.body);
  res.json({ contact });
});

router.delete("/:contactId", async (req, res, next) => {
  if ((await getContactById(req.params.contactId)) === undefined) {
    return res.status(404).json({ message: "Not found" });
  }
  await removeContact(req.params.contactId);
  res.json({ message: "contact deleted" });
});

router.put("/:contactId", requestValidation, async (req, res, next) => {
  if ((await getContactById(req.params.contactId)) === undefined) {
    return res.status(404).json({ message: "Not found" });
  }
  await updateContact(req.params.contactId, req.body);
  const contact = await getContactById(req.params.contactId);
  res.json({ contact });
});

module.exports = router;
