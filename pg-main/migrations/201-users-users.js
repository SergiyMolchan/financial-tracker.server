const pool = require('../database');

async function initTableUsers() {
	const client = await pool.connect();
	try {
		await client.query(
			`CREATE TABLE IF NOT EXISTS users.users (
				id SERIAL PRIMARY KEY,
				login VARCHAR(128) UNIQUE,
				password TEXT
			)`
		);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = initTableUsers;
