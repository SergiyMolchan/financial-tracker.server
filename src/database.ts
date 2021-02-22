import { Pool, QueryArrayResult } from 'pg';
import { database } from './config';
const { pg_database, pg_host, pg_password, pg_port, pg_user } = database;

const pool = new Pool({
	user: pg_user,
	database: pg_database,
	password: pg_password,
	host: pg_host,
	// @ts-ignore
	port: pg_port,
	max: 20
});
// todo: add semaphore
async function query(query: string, params?: any[]): Promise<QueryArrayResult> {
	const client = await pool.connect();
	try {
		return await client.query(query, params);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
};

export { pool, query };
