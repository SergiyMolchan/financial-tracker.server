import Ajv from 'ajv';
import { FastifySchema } from 'fastify';

const confirmPassword = (ajv: Ajv): Ajv	 => ajv.addKeyword({
	keyword: 'confirmPassword',
	error: {
		message: 'Passwords must match.'
	},
	validate: function (schema: FastifySchema, data: {password: string, confirmPassword: string}): boolean {
		const { password, confirmPassword } = data;
		return password === confirmPassword;
	}
});

export { confirmPassword };
