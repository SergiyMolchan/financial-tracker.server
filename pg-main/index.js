const initSchemas = require('./migrations/101-schemas');
const initTableUsers = require('./migrations/201-users-users');
const initTableCategories = require('./migrations/301-enums-categories');

async function init() {
	try {
		await initSchemas();
		await initTableUsers();
		await initTableCategories();
	} catch (e) {
		throw new Error(e);
	}
}

init().then();
