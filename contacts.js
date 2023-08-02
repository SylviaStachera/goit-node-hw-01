const fs = require("node:fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function getContactJSON() {
	try {
		const data = await fs.readFile(contactsPath, "utf8");
		const contacts = await JSON.parse(data);
		return contacts;
	} catch (error) {
		console.error("Błąd oczytu pliku: ", error.message);
		return [];
	}
}

async function listContacts() {
	const contacts = await getContactJSON();
	console.log("Lista Kontaktów");
	console.table(contacts);
}

async function getContactById(contactId) {
	try {
		const contacts = await getContactJSON();
		const findContact = contacts.find((item) => item.id === contactId);

		if (!findContact) {
			console.log(`Kontakt o id ${contactId} nie został znaleziony.`);
			return;
		}
		console.log("Zaleziony kontakt: ");
		console.table(findContact);
	} catch (error) {
		console.error("Błąd podczas wyszukiwania kontaktu: ", error.message);
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await getContactJSON();
		const findContactIndex = contacts.findIndex((item) => item.id === contactId);
		if (findContactIndex === -1) {
			console.log(`Kontakt o id ${contactId} nie został znaleziony`);
			return;
		}

		contacts.splice(findContactIndex, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		console.log(`Kontakt o id ${contactId} został usunięty.`);
		console.log("Pozostałe kontakty: ");
		console.table(contacts);
	} catch (error) {
		console.error("Błąd podczas usuwania kontaktu: ", error.message);
	}
}

async function addContact(name, email, phone) {
	try {
		const contacts = await getContactJSON();
		const newContact = { id: nanoid(), name, email, phone };
		contacts.push(newContact);

		await fs.writeFile(contactsPath, JSON.stringify(contacts));
		console.log(`Dodano ${name} do listy kontaków.`);
		console.log("Aktualna lista kontaków: ");
		console.table(contacts);
	} catch (error) {
		console.error("Błąd podczas dodawania kontaktu: ", error.message);
	}
}
