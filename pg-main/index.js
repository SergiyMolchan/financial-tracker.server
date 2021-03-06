const initSchemas = require('./migrations/101-schemas');
const initTableUsers = require('./migrations/201-users-users');
const initTableUsersGroups = require('./migrations/202-users-user_groups');
const initEnumsTypes = require('./migrations/301-enums-types');
const initTableCategories = require('./migrations/401-categories-categories');
const initTableCategoriesGroups = require('./migrations/402-categories-categories_groups');
const initGroups = require('./migrations/601-groups-groups');

// todo: create foreign key for all tables
// todo: create indexes for columns

async function init() {
	try {
		await initSchemas();
		await initEnumsTypes();
		await initTableUsers();
		await initTableCategories();
		await initGroups();
		await initTableUsersGroups();
		await initTableCategoriesGroups();
	} catch (e) {
		throw new Error(e);
	}
}

init().then();
