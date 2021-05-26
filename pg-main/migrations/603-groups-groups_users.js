const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        await client.query(
            `CREATE TABLE IF NOT EXISTS groups.groups_users (
				user_id INT,
                group_id INT,
                FOREIGN KEY (user_id) REFERENCES users.users (id),
                FOREIGN KEY (group_id) REFERENCES groups.groups(id)
			)`
        );
        await client.query(
            `CREATE INDEX groups_groups_user_id_group_id_idx ON groups.groups_users (user_id, group_id)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
