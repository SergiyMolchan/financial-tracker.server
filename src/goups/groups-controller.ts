import { errorHandler } from '../helpers/error-handler';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createGroup, getGroups, updateGroup, removeGroup } from './groups-model';

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

async function update(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data } = req.body;
	const { id, name } = data;
	try {
		await updateGroup(id, name);
		reply
			.status(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send(JSON.stringify({
				success: true,
			}));
	} catch (error) {
		errorHandler(reply, error);
	}
}

async function remove(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data } = req.body;
	const { id } = data;
	try {
		await removeGroup(id);
		reply
			.status(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send(JSON.stringify({
				success: true,
			}));
	} catch (error) {
		errorHandler(reply, error);
	}
}

export { create, get, update, remove };
