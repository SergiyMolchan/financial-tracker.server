import { FastifyReply, FastifyRequest } from 'fastify';
import { errorHandler } from './error-handler';
import { getUserIdBySessionId } from './session';
import { session } from '../config';

const unauthorizedMessage: string = JSON.stringify({
	status: 404,
	message: 'Unauthorized.'
});

async function protectRoute(request: FastifyRequest, reply: FastifyReply): Promise<void> {
	try {
		if (!request.cookies.session) errorHandler(reply, unauthorizedMessage);
		const userId: number = await getUserIdBySessionId(request.cookies.session);
		// @ts-ignore
		request.body = { ...request.body, userId };
		console.log(request.body);
	} catch (error) {
		errorHandler(reply, JSON.stringify(error));
	}
}

export { protectRoute };
