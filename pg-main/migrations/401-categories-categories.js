const pool = require('../database');

async function initTable() {
	const client = await pool.connect();
	try {
		// todo: set Foreign keys
		await client.query(
			`CREATE TABLE IF NOT EXISTS categories.categories (
				id SERIAL PRIMARY KEY,
				type_id INT,
				name VARCHAR(128) NOT NULL
			)`
		);

		await client.query(
			`CREATE FUNCTION fn_check_exists_category() RETURNS TRIGGER AS $$
			BEGIN
				IF EXISTS (
					SELECT * FROM categories.categories WHERE type_id = NEW.type_id AND name = NEW.name
				)
				THEN RETURN NULL;
				ELSE RETURN NEW;
				END IF;
			END;
			$$ LANGUAGE plpgsql;`
		);
		await client.query(
			`CREATE TRIGGER tg_groups_bind_to_user
			BEFORE INSERT ON categories.categories
			FOR EACH ROW EXECUTE PROCEDURE fn_check_exists_category();`
		)

	} catch (e) {
		throw new Error(e);
	}  finally {
		client.release();
	}
}

module.exports = initTable;
