import { newUserInterface, userInterface } from './users-interface';
import { checkPassword, encryptPassword } from './helpers/encrypt-password';
import { createUser, getUserByLogin } from './users-model';
import { createSession } from '../helpers/session';
import { session } from '../config';
import { ControllerResponse } from '../commonInterfaces/controllerResponse';

const headers = {
	'Content-Type': 'application/json; charset=utf-8'
};

async function registration({ login, password }: newUserInterface): Promise<ControllerResponse> { // todo: move req, reply from controller
	try {
		const candidates: userInterface[] = await getUserByLogin(login);
		if (candidates.length) {
			return {
				status: 409,
				headers,
				body: {
					success: false,
					message: 'A user with such a login already exists.'
				}
			};
		} else {
			const encryptedPassword: string = await encryptPassword(password);
			await createUser(login, encryptedPassword);
			return {
				status: 201,
				headers,
				body: {
					success: true,
					message: 'New user registered.'
				}
			};
		}
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			headers,
			body: {
				success: false,
				message: 'Server error. Something Went Wrong Please Try Later :('
			}
		};
	}
}

// todo: create multiple strategies authorization
async function authorization({ login, password }: userInterface): Promise<ControllerResponse> {
	const authorizationErrorMessage: ControllerResponse = {
		status: 404,
		headers,
		body: {
			success: false,
			message: 'Authorization failed.'
		}
	};
	try {
		const candidates: userInterface[] = await getUserByLogin(login);
		if (!candidates.length) return authorizationErrorMessage;
		const candidate: userInterface | undefined = candidates.find(user => user.login === login);
		if (!candidate) return authorizationErrorMessage;
		if (!await checkPassword(password, candidate.password)) return authorizationErrorMessage;

		const sessionId: string = await createSession(candidate.id, session.expire);

		return {
			status: 200,
			headers,
			cookie: ['session', sessionId, { path: '/' }],
			body: {
				success: true,
				message: 'Authorized.'
			}
		};
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			headers,
			body: {
				success: false,
				message: 'Server error. Something Went Wrong Please Try Later :(',
			}
		};
	}
}

export { registration, authorization };
