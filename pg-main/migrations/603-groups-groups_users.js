const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        await client.query(
            `CREATE TABLE IF NOT EXISTS groups.groups_users (
				user_id INT,
                group_id INT
			)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
