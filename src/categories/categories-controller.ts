import { FastifyReply, FastifyRequest } from 'fastify';
import { errorHandler } from '../helpers/error-handler';
import { createCategory, getCategories } from './categories-model';

async function create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data, userId } = req.body;
	try {
		await createCategory(userId, data.typeId, data.name);
		reply
			.status(201)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send(JSON.stringify({
				success: true,
				message: 'Created.'
			}));
	} catch (error) {
		errorHandler(reply, error);
	}
}

async function get(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { userId } = req.body;
	try {
		const categories = await getCategories(userId);
		reply
			.status(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send(JSON.stringify({
				success: true,
				categories
			}));
	} catch (error) {
		errorHandler(reply, error);
	}
}


export { create, get };
