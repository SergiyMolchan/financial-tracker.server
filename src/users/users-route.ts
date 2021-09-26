import { registration, authorization } from './users-controller';
import { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import { newUserInterface, userInterface } from './users-interface';

// const response = {
// 	type: 'object',
// 	required: ['success', 'message'],
// 	properties: {
// 		success: {
// 			type: 'boolean'
// 		},
// 		message: {
// 			type: 'string'
// 		}
// 	}
// };

const registrationRoute: RouteOptions = {
	method: 'POST',
	url: '/user/registration',
	schema: {
		body: {
			confirmPassword: true,
			type: 'object',
			required: ['login', 'password', 'confirmPassword'],
			properties: {
				login: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
					// errorMessage: {}
				},
				password: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
				confirmPassword: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
			},
		},
		// response: {
		// 	201: response,
		// 	409: response
		// }
	},
	handler: async (req: FastifyRequest, reply: FastifyReply) => {
		const newUser: newUserInterface = req.body as newUserInterface;
		const { status, headers, body } = await registration(newUser);
		reply
			.code(status)
			.headers(headers)
			.send(body);
	}
};

const authorizationRoute: RouteOptions = {
	method: 'POST',
	url: '/user/authorization',
	schema: {
		body: {
			type: 'object',
			required: ['login', 'password'],
			properties: {
				login: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
					// errorMessage: {}
				},
				password: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
			},
		},
		// response: {
		// 	201: response,
		// 	409: response
		// }
	},
	// handler: authorization
	handler: async (req: FastifyRequest, reply: FastifyReply) => {
		const user: userInterface = req.body as userInterface;
		const { status, headers, body, cookie } = await authorization(user);
		if (cookie?.length) reply.setCookie(...cookie);
		reply
			.code(status)
			.headers(headers)
			.send(body);
	}
};

export { registrationRoute, authorizationRoute };
