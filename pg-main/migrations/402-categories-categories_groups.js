const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        await client.query(
            `CREATE TABLE IF NOT EXISTS categories.categories_groups (
                category_id INT,
                group_id INT
			)`
        );
        await client.query(
            `CREATE INDEX categories_groups_group_id_idx ON categories.categories_groups (group_id)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
