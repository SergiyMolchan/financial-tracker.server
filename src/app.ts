import fastify from 'fastify';
import { registrationRoute } from './users';
import Ajv from 'ajv';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { userValidator } from './users';

const app = fastify({ logger: true });
const ajv = new Ajv();
userValidator.confirmPassword(ajv);

app.setValidatorCompiler(({ schema }: FastifyRouteSchemaDef): any => ajv.compile(schema));
app.setSchemaErrorFormatter(errors => {
	return new Error(JSON.stringify({ errors: errors.map(error => error.message) }));
});
app.route(registrationRoute);

export default app;
