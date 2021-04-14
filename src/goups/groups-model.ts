import { maindb } from '../databases';
import { QueryArrayResult } from 'pg';
const { query } = maindb;

async function createGroup(user_id: number, name: string): Promise<QueryArrayResult<any[]>> {
	return await query('INSERT INTO groups.groups (creator_id, name) VALUES ($1::int, $2::varchar(128))', [user_id, name]);
}

async function getGroups(user_id: number): Promise<any> {
	const { rows } = await query('SELECT id, name FROM groups.groups JOIN groups.groups_users ON groups.id = groups.groups_users.group_id WHERE user_id = $1::INT', [user_id]);
	return rows;
}

// async function updateGroup(id: number): Promise<QueryArrayResult<any[]>> {
// 	// return await query('INSERT INTO groups.groups (name) VALUES ($1::varchar(128))', [name]);
// }
//
// async function removeGroup(id: number): Promise<QueryArrayResult<any[]>> {
// 	// return await query('INSERT INTO groups.groups (name) VALUES ($1::varchar(128))', [name]);
// }

export { createGroup, getGroups };
