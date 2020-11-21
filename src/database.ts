import { Pool } from 'pg';
import { database } from './config';
const { pg_database, pg_host, pg_password, pg_port, pg_user } = database;

const pool = new Pool({
	user: pg_user,
	database: pg_database,
	password: pg_password,
	host: pg_host,
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	port: pg_port,
});

module.exports = pool.query;
