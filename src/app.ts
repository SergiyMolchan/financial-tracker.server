import fastify from 'fastify';
import fastifyCookie, { FastifyCookieOptions } from 'fastify-cookie';
import fastifyAuth from 'fastify-auth';
import Ajv from 'ajv';
import { userRoutes } from './users';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { userValidator } from './users';
import { cookie } from './config';

const app = fastify({ logger: true });
// app.register(fastifyAuth);
app.register(fastifyCookie, { secret: cookie.secret } as FastifyCookieOptions);

// register validators
const ajv = new Ajv();
userValidator.confirmPassword(ajv);

app.setValidatorCompiler(({ schema }: FastifyRouteSchemaDef): any => ajv.compile(schema));
app.setSchemaErrorFormatter(errors => {
	return new Error(JSON.stringify({ errors: errors.map(error => error.message) }));
});

// register routes

// todo: set preHandler for protected routes
app.route(userRoutes.registrationRoute);
app.route(userRoutes.authorizationRoute);

export default app;
