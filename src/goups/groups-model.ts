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

async function updateGroup(id: number, name: string): Promise<QueryArrayResult<any[]>> {
	return await query('UPDATE groups.groups SET name = $1 WHERE id = $2', [name, id]);
}

async function removeGroup(id: number): Promise<QueryArrayResult<any[]>> {
	await query('DELETE FROM groups.groups_users WHERE group_id = $1', [id]);
	return await query('DELETE FROM groups.groups WHERE id = $1', [id]);
}

export { createGroup, getGroups, updateGroup, removeGroup };
