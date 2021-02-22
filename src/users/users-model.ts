import { query } from '../database';
import { userInterface } from './users-interface';
import { QueryArrayResult } from 'pg';

async function createUser({ login, password, email }: userInterface): Promise<QueryArrayResult> {
	// @ts-ignore
	return await query('INSERT INTO users.users (login, password, email) VALUES ($1::varchar(128), $2::text, $3::varchar(255))', [login, password, email]);
}

async function getUserByLogin(login: string): Promise<QueryArrayResult> {
	return await query('SELECT * FROM users.users WHERE login=$1::varchar(128)', [login]);
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
