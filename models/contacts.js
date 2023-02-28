const fs = require("fs").promises;

async function readFile() {
  const contacts = await fs.readFile("./contacts.json");
  return JSON.parse(contacts);
}

async function writeFile(data) {
  const stringifiedData = JSON.stringify(data);
  await fs.writeFile("./contacts.json", stringifiedData);
}

const listContacts = async () => {
  const contacts = await readFile();
  return contacts;
};

const getContactById = async (contactId) => {
  const parsedContacts = await readFile();
  const [contact] = parsedContacts.filter(
    (contact) => contact.id === contactId
  );
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readFile();
  const updatedContacts = contacts.filter(
    (contact) => !(contact.id === contactId)
  );
  await writeFile(updatedContacts);
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };

  const contacts = await readFile();
  const updatedContacts = [...contacts, newContact];
  await writeFile(updatedContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await readFile();
  const updatedContacts = contacts.map((contact) => {
    if (contactId === contact.id) {
      contact = {
        id: contact.id,
        name,
        email,
        phone,
      };
    }
    return contact;
  });
  await writeFile(updatedContacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
