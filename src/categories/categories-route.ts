import { RouteOptions } from 'fastify';
import { create, get } from './categories-controller';

const getCategoriesRoute: RouteOptions = {
	method: 'GET',
	url: '/categories',
	handler: get
};

const createCategoriesRoute: RouteOptions = {
	method: 'POST',
	url: '/categories',
	schema: {
		body: {
			type: 'object',
			required: ['name', 'typeId'],
			properties: {
				name: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
				typeId: {
					type: 'number',
				},
			},
		},
	},
	handler: create
};

export { createCategoriesRoute, getCategoriesRoute };
