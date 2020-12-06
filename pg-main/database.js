const { Pool } = require('pg');
const { pg_user, pg_password, pg_database, pg_port, pg_host } = require('./config')

const pool = new Pool({
	user: pg_user,
	host: pg_host,
	database: pg_database,
	password: pg_password,
	port: pg_port,
});

module.exports = pool;
