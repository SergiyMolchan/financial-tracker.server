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
			    currency_id INT,
			    sum INT,
			    description VARCHAR(256),
			    date_time DATE DEFAULT now(),
                FOREIGN KEY (category_id) REFERENCES categories.categories (id),
                FOREIGN KEY (group_id) REFERENCES groups.groups (id),
                FOREIGN KEY (type_id) REFERENCES enums.types (id),
                FOREIGN KEY (user_id) REFERENCES users.users (id),
                FOREIGN KEY (currency_id) REFERENCES financial_operations.currencies (id)
			)`
        );
        await client.query(
            `CREATE INDEX financial_operations_group_id_idx ON financial_operations.operations (group_id)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
