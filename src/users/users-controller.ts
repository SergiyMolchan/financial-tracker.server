import { newUserInterface, userInterface } from './users-interface';
import { Request, Response } from 'express';
import errorHandler from '../helpers/error-handler';
import { createUser } from './users-model';

class UsersController {
	async registration(req: Request, res: Response) {
		const { login, password, confirmPassword, email }: newUserInterface = req.body;
		try {

		} catch (e) {
			errorHandler(res, e);
		}
	}

	async authorization(req: Request, res: Response) {
		const { login, password } = req.body;
		try {

		} catch (e) {
			errorHandler(res, e);
		}
	}
}

export default new UsersController();
