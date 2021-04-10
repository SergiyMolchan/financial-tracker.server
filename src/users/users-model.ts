import { maindb } from '../databases';
import { userInterface } from './users-interface';
import { QueryArrayResult } from 'pg';
const { query } = maindb;

async function createUser(login: string, password: string): Promise<QueryArrayResult<any[]>> {
	return await query('INSERT INTO users.users (login, password) VALUES ($1::varchar(128), $2::text)', [login, password]);
}

async function getUserByLogin(login: string): Promise<userInterface[]> {
	const { rows } = await query('SELECT * FROM users.users WHERE login=$1::varchar(128)', [login]);
	// @ts-ignore
	return rows;
}

async function getUserById(id: number): Promise<QueryArrayResult> {
	return await query('SELECT * FROM users.users WHERE id=$1::varchar(128)', [id]);
}

async function deleteUser(id: number): Promise<QueryArrayResult> {
	return await query('DELETE FROM users.users WHERE id=$1::integer', [id]);
}

async function updateUser(): Promise<QueryArrayResult> {
	return await query('');
}

export { getUserById, getUserByLogin, createUser, updateUser, deleteUser };
