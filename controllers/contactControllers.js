const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavoriteStatus,
} = require("../models/contacts");

const listContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  res.json({ contact });
};

const removeContactController = async (req, res) => {
  await removeContact(req.params.contactId);
  res.json({ message: "success" });
};

const addContactController = async (req, res) => {
  await addContact(req.body);
  res.json({ message: "success" });
};

const updateContactController = async (req, res) => {
  await updateContact(req.params.contactId, req.body);
  const contact = await getContactById(req.params.contactId);
  res.json({ contact });
};

const updateFavoriteStatusController = async (req, res) => {
  await updateFavoriteStatus(req.params.contactId, req.body);
  const contact = await getContactById(req.params.contactId);
  res.json({ contact });
};

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateFavoriteStatusController,
};
