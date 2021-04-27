import { FastifyReply, FastifyRequest } from 'fastify';
import { errorHandler } from '../helpers/error-handler';
import * as operation from './financial-operations-model';

async function create(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data, userId } = req.body;
	try {
		// todo: check field exist
		await operation.create({ userId, ...data });

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
	const { data, userId } = req.body;
	try {
		// todo: check field exist
		// todo: fix any
		const operations: any = await operation.get({ userId, ...data });

		reply
			.status(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send({
				success: true,
				data: operations
			});
	} catch (error) {
		console.error(error);
		errorHandler(reply, error);
	}
}

async function update(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { data, userId } = req.body;
	try {
		// todo: check field exist
		await operation.update({ userId, ...data });

		reply
			.status(200)
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

export { create, get, update };
