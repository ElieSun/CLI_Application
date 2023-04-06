const { Command } = require('commander');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await listContacts();
      console.table(list);
      break;

    case "get":
      const getContact = await getContactById(id);
      console.table(getContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const deleteContact = await removeContact(id);
      console.table(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const program = new Command();

program
  .option("-a, --action <action>", "Choose action")
  .option("-i, --id <id>", "User id")
  .option("-n, --name <name>", "User name")
  .option("-e, --email <email>", "User email")
  .option("-p, --phone <phone>", "User phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);

