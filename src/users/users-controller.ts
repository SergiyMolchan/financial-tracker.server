import { newUserInterface, userInterface } from './users-interface';
import { errorHandler } from '../helpers/error-handler';
import { createUser } from './users-model';
import { FastifyReply, FastifyRequest } from "fastify";


async function registration(req: FastifyRequest, reply: FastifyReply) {
	// @ts-ignore
	const { login, password, confirmPassword, email }: newUserInterface = req.body;
	try {

	} catch (e) {
		errorHandler(reply, e);
	}
}

async function authorization(req: FastifyRequest, reply: FastifyReply) {
	// @ts-ignore
	const { login, password } = req.body;
	try {

	} catch (e) {
		errorHandler(reply, e);
	}
}

export {registration, authorization}
