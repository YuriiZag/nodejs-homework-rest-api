const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavoriteStatus,
} = require("../models/contacts");

const listContactsController = async (req, res) => {
  const {userId, query} = req
  const contacts = await listContacts(userId, query.page, query.limit);
  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const contact = await getContactById(req.params.contactId, req.userId);
  res.json({ contact });
};

const removeContactController = async (req, res) => {
  await removeContact(req.params.contactId, req.userId);
  res.json({ message: "success" });
};

const addContactController = async (req, res) => {
  await addContact(req.body, req.userId);
  res.json({ message: "success" });
};

const updateContactController = async (req, res) => {
  await updateContact(req.params.contactId, req.body, req.userId);
  const contact = await getContactById(req.params.contactId, req.userId);
  res.json({ contact });
};

const updateFavoriteStatusController = async (req, res) => {
  await updateFavoriteStatus(req.params.contactId, req.body, req.userId);
  const contact = await getContactById(req.params.contactId, req.userId);
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
