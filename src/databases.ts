import { Pool, QueryArrayResult } from 'pg';
import redis from 'redis';
import { database, redisOpts } from './config';
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
}

const maindb = { pool, query };
const { redis_port, redis_host } = redisOpts;
const cache = redis.createClient({
	host: redis_host,
	port: redis_port
});


export { maindb, cache };
