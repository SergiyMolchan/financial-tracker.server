const pool = require('../database');

async function init() {
	const client = await pool.connect();
	try {
		await client.query('INSERT INTO enums.types (name) VALUES ($1)', ['income']);
		await client.query('INSERT INTO enums.types (name) VALUES ($1)', ['costs']);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = init;
