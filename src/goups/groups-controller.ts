import { errorHandler } from '../helpers/error-handler';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createGroup, getGroups } from './groups-model';

async function create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data, userId } = req.body;
	try {
		await createGroup(userId, data.name);
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
		const groups = await getGroups(userId);
		reply
			.status(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send(JSON.stringify({
				success: true,
				groups
			}));
	} catch (error) {
		errorHandler(reply, error);
	}
}

export { create, get };
