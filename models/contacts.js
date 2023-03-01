const { Contact } = require("../db/postModel");
const { UnexistedContactError } = require("../helpers/errors");

const listContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new UnexistedContactError(
      `Failure! There is no contact found with id: ${contactId}`
    );
  }
};

const removeContact = async (contactId) => {
  try {
    await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    throw new UnexistedContactError(`Failure! There is no contact found with id: ${contactId}`);
  }
};

const addContact = async ({ name, email, phone, favorite = false }) => {
  const contact = new Contact({
    name,
    email,
    phone,
    favorite,
  });
  await contact.save();
  return contact;
};

const updateContact = async (
  contactId,
  { name, email, phone, favorite = false }
) => {
  try {
    await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone, favorite },
    });
  } catch (error) {
    throw new UnexistedContactError(
      `Failure! There is no contact found with id: ${contactId}`
    );
  }
};

const updateFavoriteStatus = async (contactId, { favorite }) => {
  try {
    await Contact.findByIdAndUpdate(contactId, { $set: { favorite } });
  } catch (error) {
    throw new UnexistedContactError(
      `Failure! There is no contact found with id: ${contactId}`
    );
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteStatus,
};
