import { maindb } from '../databases';
import { QueryArrayResult } from 'pg';
const { query } = maindb;

// todo: replace names *_id to Id
// eslint-disable-next-line max-len
async function create(data: any): Promise<any> { // todo: fix eny
	const { categoryId, typeId, groupId, userId, currencyId, sum, description, dateTime } = data;
	return await query('INSERT INTO financial_operations.operations VALUES (category_id, type_id, group_id, user_id, currency_id, sum, description, date_time)',
		[categoryId, typeId, groupId, userId, currencyId, sum, description, dateTime]
	);
}

async function get(groupId: number): Promise<any> {
	const { rows } = await query('SELECT * FROM financial_operations.operations WHERE group_id = $1::INT', [groupId]);
	return rows;
}

async function update(data: any) { // todo: fix eny types
	const { id, description } = data;
	return await query('UPDATE financial_operations.operations SET description = COALESCE($2::VARCHAR(256), description) WHERE id = $1::INT',
		[id, description]
	);
}

export { create, get, update };
