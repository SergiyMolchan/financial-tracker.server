import bcrypt from 'bcrypt';
import { createUser } from './users-model';
import { newUserInterface, userInterface } from './users-interface';

class UsersController {
	async registration({ login, password, confirmPassword, email }: newUserInterface) {
		try {

		} catch (e) {

		}
	}

	async authorization() {

	}
}

export default new UsersController();
