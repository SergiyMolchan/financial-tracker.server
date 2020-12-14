import { query } from '../database';
import { userInterface } from './users-interface';
import { QueryArrayResult } from 'pg';

const createUser = async ({ login, password, email }: userInterface): Promise<QueryArrayResult> => {
	// @ts-ignore
	return await query('INSERT INTO users.users (login, password, email) VALUES ($1::varchar(128), $2::text, $3::varchar(255))', [login, password, email]);
};

const getUser = async ({ login }: userInterface): Promise<QueryArrayResult> => {
	return await query('SELECT * FROM users.users WHERE login=$1::varchar(128)', [login]);
};

const deleteUser = async ({ id }: userInterface): Promise<QueryArrayResult> => {
	return await query('DELETE FROM users.users WHERE id=$1::integer', [id]);
};

const updateUser = async (): Promise<QueryArrayResult> => {
	return await query('');
};

export { getUser, createUser, updateUser, deleteUser };
