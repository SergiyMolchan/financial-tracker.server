import { maindb } from '../databases';
import { QueryArrayResult } from 'pg';
const { query } = maindb;

// todo: replace names *_id to Id
async function createCategory(user_id: number, type_id: number, name: string, groupId: number): Promise<any> {
	const queries = [
		await query(`
			INSERT INTO categories.categories (type_id, name) VALUES ($1::INT, $2::VARCHAR(128))
		`, [type_id, name]),
		await query(`
			WITH user_bind_to_category AS (
				INSERT INTO categories.users_categories (user_id, category_id) VALUES ($3::INT, (SELECT id FROM categories.categories WHERE type_id = $1::INT AND name =  $2::VARCHAR(128)))	    
			)
			INSERT INTO categories.categories_groups (group_id, category_id) VALUES ($4::INT, (SELECT id FROM categories.categories WHERE type_id = $1::INT AND name =  $2::VARCHAR(128)));
		`, [type_id, name, user_id, groupId]),
	];
	return await Promise.all(queries);
}

async function getCategories(user_id: number, groupId: number): Promise<any> {
	const { rows } = await query('SELECT id, user_id, type_id, group_id, name FROM categories.categories_groups INNER JOIN categories.users_categories ON users_categories.category_id = categories_groups.category_id INNER JOIN categories.categories ON categories.id = categories_groups.category_id WHERE user_id = $1::INT AND group_id = $2::INT', [user_id, groupId]);
	return rows;
}

async function removeCategories(categoryId: number, groupId: number) {
	await query('DELETE FROM categories.categories_groups WHERE category_id = $1 AND group_id = $2', [categoryId, groupId]);
}

export { createCategory, getCategories, removeCategories };
