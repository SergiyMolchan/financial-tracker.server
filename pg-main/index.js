const initSchemas = require('./migrations/101-schemas');
const initTableUsers = require('./migrations/201-users-users');
const initTableUsersGroups = require('./migrations/603-groups-groups_users');
const initEnumsTypes = require('./migrations/301-enums-types');
const initTableCategories = require('./migrations/401-categories-categories');
const initCategoriesUserCat = require('./migrations/403-categories-users_categories');
const initTableCategoriesGroups = require('./migrations/402-categories-categories_groups');
const initTableFinancialOperations = require('./migrations/501-financial_operations-operations')
const initTableFinancialOperationsCurrencies = require('./migrations/502-financial_operations-currencies')
const initGroups = require('./migrations/601-groups-groups');
const initGroupsPermissions = require('./migrations/602-groups-permissions');
// todo: create foreign key for all tables
// todo: create indexes for columns

async function init() {
	try {
		await Promise.all([
			await initSchemas(),
			await initEnumsTypes(),
			await initTableUsers(),
			await initTableCategories(),
			await initGroups(),
			await initTableUsersGroups(),
			await initTableCategoriesGroups(),
			await initCategoriesUserCat(),
			await initTableFinancialOperationsCurrencies(),
			await initTableFinancialOperations(),
			await initGroupsPermissions()
		])

		await require('./seeds/301-enums-types')();
		await require('./seeds/502-currencies')();
	} catch (e) {
		throw new Error(e);
	}
}

init().then();
