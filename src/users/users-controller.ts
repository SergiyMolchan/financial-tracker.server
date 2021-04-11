import { newUserInterface, userInterface } from './users-interface';
import { encryptPassword, checkPassword } from './helpers/encrypt-password';
import { errorHandler } from '../helpers/error-handler';
import { createUser, getUserByLogin } from './users-model';
import { FastifyReply, FastifyRequest } from 'fastify';
import { createSession } from '../helpers/session';
import { session } from '../config';

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
			const encryptedPassword: string = await encryptPassword(password);
			await createUser(login, encryptedPassword);
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

// todo: create multiple strategies authorization
async function authorization(req: FastifyRequest, reply: FastifyReply): Promise<void> {
	const authorizationErrorMessage: string = JSON.stringify({
		status: 404,
		message: 'Authorization failed.'
	});

	// @ts-ignore
	const { login, password } = req.body;
	try {
		const candidates: userInterface[] = await getUserByLogin(login);
		if (!candidates.length) throw authorizationErrorMessage;
		const candidate: userInterface | undefined = candidates.find(user => user.login === login);
		if (!candidate) throw authorizationErrorMessage;
		if (!await checkPassword(password, candidate.password)) throw authorizationErrorMessage;

		const sessionId: string = await createSession(candidate.id, session.expire);
		reply
			.setCookie('session', sessionId, { path: '/' })
			.code(200)
			.header('Content-Type', 'application/json; charset=utf-8')
			.send(JSON.stringify({
				success: true,
				message: 'Authorized.'
			}));
	} catch (error) {
		console.error(error);
		errorHandler(reply, error);
	}
}

export { registration, authorization };
