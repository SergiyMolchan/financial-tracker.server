import fastify, { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import fastifyCookie, { FastifyCookieOptions } from 'fastify-cookie';
import Ajv from 'ajv';
import { userRoutes } from './users';
import { groupsRoutes } from './goups';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { userValidator } from './users';
import { cookie } from './config';
import { protectRoute } from './helpers/protect-route';

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
app.route({
	...groupsRoutes.getGroupsRoute,
	preHandler: async (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes): Promise<void> => {
		await protectRoute(request, reply);
		done();
	}
});

app.route({
	...groupsRoutes.createGroupsRoute,
	preHandler: async (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes): Promise<void> => {
		await protectRoute(request, reply);
		done();
	}
});

export default app;
