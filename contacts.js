const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const deleteIndex = contacts.map((contact) => contact.id).indexOf(contactId);
  contacts.splice(deleteIndex, 1);
  await updateContacts(contacts);
  return contacts;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(8), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
