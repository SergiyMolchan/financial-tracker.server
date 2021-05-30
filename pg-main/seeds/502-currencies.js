const pool = require('../database');

async function init() {
	const client = await pool.connect();
	try {
		await client.query('INSERT INTO financial_operations.currencies (name) VALUES ($1)', ['USD']);
		await client.query('INSERT INTO financial_operations.currencies (name) VALUES ($1)', ['UAH']);
		await client.query('INSERT INTO financial_operations.currencies (name) VALUES ($1)', ['EUR']);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = init;
