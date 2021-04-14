import { registration, authorization } from './users-controller';
import { RouteOptions } from 'fastify';

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
	handler: registration
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
	handler: authorization
};

export { registrationRoute, authorizationRoute };
