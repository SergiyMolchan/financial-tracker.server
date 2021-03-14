const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        // todo: set Foreign keys
        await client.query(
            `CREATE TABLE IF NOT EXISTS financial_operations.operations (
			    id SERIAL PRIMARY KEY,
			    category_id INT,
			    type_id INT,
			    group_id INT,
			    user_id INT,
			    sum INT,
			    description VARCHAR(256),
			    date_time DATE DEFAULT now()
			)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
