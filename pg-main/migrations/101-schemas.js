const pool = require('../database');

async function initSchemas() {
	const client = await pool.connect();
	try {
		await client.query(`CREATE SCHEMA IF NOT EXISTS enums`);
		await client.query(`CREATE SCHEMA IF NOT EXISTS categories`);
		await client.query(`CREATE SCHEMA IF NOT EXISTS users`);
		await client.query(`CREATE SCHEMA IF NOT EXISTS financial_operations`);
		await client.query(`CREATE SCHEMA IF NOT EXISTS groups`);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = initSchemas;
