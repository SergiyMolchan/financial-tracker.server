import { maindb } from '../databases';
import { QueryArrayResult } from 'pg';
const { query } = maindb;

// todo: replace names *_id to Id
// eslint-disable-next-line max-len
async function create(data: any): Promise<any> { // todo: fix eny
	const { categoryId, typeId, groupId, userId, currencyId, sum, description, dateTime } = data;
	return await query('INSERT INTO financial_operations.operations (category_id, type_id, group_id, user_id, currency_id, sum, description, date_time) VALUES ($1, $2, $3, $4, $5, $6, $7, to_timestamp($8))',
		[categoryId, typeId, groupId, userId, currencyId, sum, description, dateTime]
	);
}

async function get(data: any): Promise<any> {
	const { userId, groupId } = data;
	const { rows } = await query('SELECT * FROM financial_operations.operations WHERE group_id = $1::INT AND user_id = $2', [groupId, userId]);
	return rows;
}

async function update(data: any) { // todo: fix eny types
	const { id, description, sum } = data;
	return await query('UPDATE financial_operations.operations SET description = COALESCE($2::VARCHAR(256), description), sum=COALESCE($3, sum)  WHERE id = $1::INT',
		[id, description, sum]
	);
}

async function remove(data: any) { // todo: fix eny types
	const { id } = data;
	return await query('DELETE FROM financial_operations.operations WHERE id = $1::INT',
		[id]
	);
}

export { create, get, update, remove };
