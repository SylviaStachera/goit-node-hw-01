const { resolve } = require("node:path");
const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");
const readline = require("node:readline");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function prompt(question) {
	return new Promise((resolve) => {
		rl.question(question + "\n >", (answer) => {
			resolve(answer.trim());
		});
	});
}

async function test() {
	try {
		// Wyświetlanie wszystkich kontaktów
		const listStartTime = Date.now();
		await listContacts();
		console.log("Czas wyświetlenia listy kontaktów: ", Date.now() - listStartTime, "ms");

		// Wyszukiwanie kontaktu po ID
		const contactId = await prompt("Podaj nr id który chcesz wyszukać: ");
		const findStartTime = Date.now();
		const contacts = await getContactById(contactId);
		console.log("Czas wyszukiwania kontaków: ", Date.now() - findStartTime, "ms");
		// console.log("Znaleziony kontakt:");
		// console.table(contacts);

		// Usuwanie kontaktu
		const contactIdToRemove = await prompt("Podaj nr id który chcesz usunąć: ");
		const deleteStartTime = Date.now();
		await removeContact(contactIdToRemove);
		console.log("Czas usunięcia kontatku: ", Date.now() - deleteStartTime, "ms");

		// Dodawanie kontaktów
		const name = await prompt("Podaj swoje imię: ");
		const email = await prompt("Podaj swój mail: ");
		const phone = await prompt("Podaj swój numer telefonu: ");

		const addStartTime = Date.now();
		await addContact(name, email, phone);
		console.log("Czas dodawani kontatku: ", Date.now() - addStartTime, "ms");

		rl.close();
	} catch (error) {
		console.log("Wystąpił błąd w teście: ", error.message);
	}
}
test();
