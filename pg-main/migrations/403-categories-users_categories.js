const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        await client.query(
            `CREATE TABLE IF NOT EXISTS categories.users_categories (
			    user_id INT,
			    category_id INT
			)`
        );
        await client.query(
            `CREATE INDEX users_categories_user_id_idx ON categories.users_categories (user_id)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
