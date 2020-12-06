const pool = require('../database');

async function initTable() {
	const client = await pool.connect();
	try {
		await client.query(
			`CREATE TABLE IF NOT EXISTS enums.categories (
				id SERIAL PRIMARY KEY,
				user_id int DEFAULT NULL,
				type varchar(64) CHECK (type='income' OR type='costs'),
				name varchar(128) NOT NULL,
				icon_id int,
                CONSTRAINT user_id
                    FOREIGN KEY(user_id)
                        REFERENCES users.users(id)
			)`
		);
	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = initTable;
