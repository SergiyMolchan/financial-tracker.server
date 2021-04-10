const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        // todo: add user permissions
        await client.query(
            `CREATE TABLE IF NOT EXISTS groups.groups_permissions (
			    id SERIAL PRIMARY KEY,
			    name VARCHAR(128)
			)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
