const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        // todo: add user permissions
        await client.query(
            `CREATE TABLE IF NOT EXISTS groups.groups (
			    id SERIAL PRIMARY KEY,
			    creator_id INT,
			    name VARCHAR(128)
			)`
        );

        await client.query(
            `CREATE FUNCTION fn_groups_bind_to_user() RETURNS TRIGGER AS $$
            BEGIN
                INSERT INTO groups.groups_users (user_id, group_id) VALUES (NEW.creator_id, NEW.id);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql`
        );
        await client.query(
            `CREATE TRIGGER tg_groups_bind_to_user
            AFTER INSERT ON groups.groups
            FOR EACH ROW EXECUTE PROCEDURE fn_groups_bind_to_user()`
        )

    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}



module.exports = initTable;
