import { newUserInterface, userInterface } from './users-interface';
import { errorHandler } from '../helpers/error-handler';
import { createUser, getUserByLogin } from './users-model';
import { FastifyReply, FastifyRequest } from 'fastify';

async function registration(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { login, password }: newUserInterface = req.body;
	try {
		const candidates: userInterface[] = await getUserByLogin(login);
		if (candidates.length) {
			throw JSON.stringify({
				status: 409,
				message: 'A user with such a login already exists.'
			});
		} else {
			await createUser(login, password);
			reply
				.code(201)
				.header('Content-Type', 'application/json; charset=utf-8')
				.send(JSON.stringify({
					success: true,
					message: 'New user registered.'
				}));
		}
	} catch (error) {
		errorHandler(reply, error);
	}
}

async function authorization(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	// @ts-ignore
	const { login, password } = req.body;
	try {
		// code
	} catch (error) {
		errorHandler(reply, error);
	}
}

export { registration, authorization };
