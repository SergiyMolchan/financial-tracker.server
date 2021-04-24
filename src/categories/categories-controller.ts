import { FastifyReply, FastifyRequest } from 'fastify';
import { errorHandler } from '../helpers/error-handler';
import { createCategory, getCategories } from './categories-model';

async function create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data, userId } = req.body;
	try {
		await createCategory(userId, data.typeId, data.name, data.groupId);
		reply
			.status(201)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send({
				success: true,
				message: 'Created.'
			});
	} catch (error) {
		console.error(error);
		errorHandler(reply, error);
	}
}

async function get(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { userId, data } = req.body;
	try {
		const { groupId } = data;
		const categories = await getCategories(userId, groupId);
		reply
			.status(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send({
				success: true,
				categories
			});
	} catch (error) {
		errorHandler(reply, error);
	}
}


export { create, get };
