import { maindb } from '../databases';
import { QueryArrayResult } from 'pg';
const { query } = maindb;

// todo: replace names *_id to Id
async function createCategory(user_id: number, type_id: number, name: string): Promise<void> {
	await query(`
			INSERT INTO categories.categories (type_id, name) VALUES ($1::int, $2::varchar(128));
		`, [type_id, name]);
	await query(`
			INSERT INTO categories.users_categories (user_id, category_id) VALUES ($3::INT, (SELECT id FROM categories.categories WHERE type_id = $1::INT AND name = $2::varchar(128)));
		`, [type_id, name, user_id]);
}

async function getCategories(user_id: number): Promise<any> {
	const { rows } = await query('SELECT id, name FROM groups.groups JOIN groups.groups_users ON groups.id = groups.groups_users.group_id WHERE user_id = $1::INT', [user_id]);
	return rows;
}

export { createCategory, getCategories };
