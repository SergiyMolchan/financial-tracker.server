import fastify from 'fastify';
import Ajv from 'ajv';
import { userRoutes } from './users';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { userValidator } from './users';

const app = fastify({ logger: true });
const ajv = new Ajv();
userValidator.confirmPassword(ajv);

app.setValidatorCompiler(({ schema }: FastifyRouteSchemaDef): any => ajv.compile(schema));
app.setSchemaErrorFormatter(errors => {
	return new Error(JSON.stringify({ errors: errors.map(error => error.message) }));
});
app.route(userRoutes.registrationRoute);
app.route(userRoutes.authorizationRoute);

export default app;
