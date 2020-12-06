const pool = require('../database');

async function initTableUsers() {
	const client = await pool.connect();
	try {
		await client.query(
			`CREATE TABLE IF NOT EXISTS users.users (
				id SERIAL PRIMARY KEY,
				login varchar(128) UNIQUE,
				password text,
				settings jsonb DEFAULT NULL,
				email varchar(255) DEFAULT NULL
			)`
		);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = initTableUsers;
