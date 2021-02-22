import { newUserInterface, userInterface } from './users-interface';
import errorHandler from '../helpers/error-handler';
import { createUser } from './users-model';
import {FastifyReply, FastifyRequest} from "fastify";

class UsersController {
	async registration(req: FastifyRequest, reply: FastifyReply) {
		const { login, password, confirmPassword, email }: newUserInterface = req.body;
		try {

		} catch (e) {
			errorHandler(reply, e);
		}
	}

	async authorization(req: FastifyRequest, reply: FastifyReply) {
		const { login, password } = req.body;
		try {

		} catch (e) {
			errorHandler(reply, e);
		}
	}
}

export default new UsersController();
