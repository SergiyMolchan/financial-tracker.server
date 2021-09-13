import fastify, { FastifyReply, FastifyRequest, RouteOptions } from 'fastify';
import fastifyCookie, { FastifyCookieOptions } from 'fastify-cookie';
import Ajv from 'ajv';
import { userRoutes } from './users';
import { groupsRoutes } from './goups';
import { categoriesRoute } from './categories';
import { financialOperationsRoutes } from './financial-operations';
import { FastifyRouteSchemaDef } from 'fastify/types/schema';
import { userValidator } from './users';
import { cookie, mode } from './config';
import { protectRoute } from './helpers/protect-route';
import fastifyCors from 'fastify-cors';

const app = fastify({
	logger: true,
	ajv: {
		customOptions: {
			removeAdditional: true,
			useDefaults: true,
			coerceTypes: true,
			allErrors: false,
			nullable: true,
		},
	},
});

if (mode === 'development') app.register(fastifyCors);

app.register(fastifyCookie, { secret: cookie.secret } as FastifyCookieOptions);

// define validators
const ajv = new Ajv();
userValidator.confirmPassword(ajv);

app.setValidatorCompiler(({ schema }: FastifyRouteSchemaDef): any => ajv.compile(schema));
// app.setSchemaErrorFormatter(errors => {
// 	console.log(errors)
//
// 	throw { errors: errors };
// }); //todo: handle errors

// define routes
// todo: set preHandler for protected routes
app.route(userRoutes.registrationRoute);
app.route(userRoutes.authorizationRoute);

const protectedRoutes: RouteOptions[] = [
	groupsRoutes.getGroupsRoute,
	groupsRoutes.createGroupsRoute,
	groupsRoutes.updateGroupsRoute,
	groupsRoutes.deleteGroupsRoute,
	categoriesRoute.getCategoriesRoute,
	categoriesRoute.createCategoriesRoute,
	categoriesRoute.removeCategoriesRoute,
	financialOperationsRoutes.getOperationsRoute,
	financialOperationsRoutes.createOperationsRoute,
	financialOperationsRoutes.updateOperationsRoute,
	financialOperationsRoutes.removeOperationsRoute
];

for (const route of protectedRoutes) {
	app.route({
		...route,
		preHandler: async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
			await protectRoute(request, reply);
		}
	});
}

export default app;
