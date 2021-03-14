const pool = require('../database');

async function initTable() {
    const client = await pool.connect();
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS enums.types (
                id SERIAL PRIMARY KEY,
                name VARCHAR(64) 
			)`
        );
    } catch (e) {
        throw new Error(e);
    }  finally {
        client.release();
    }
}

module.exports = initTable;
