const pool = require('../database');

async function initTable() {
	const client = await pool.connect();
	try {
		// todo: set Foreign keys
		await client.query(
			`CREATE TABLE IF NOT EXISTS categories.categories (
				id SERIAL PRIMARY KEY,
				type_id INT,
				name VARCHAR(128) NOT NULL
			)`
		);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = initTable;
