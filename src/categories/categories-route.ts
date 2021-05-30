import { RouteOptions } from 'fastify';
import { create, get, remove } from './categories-controller';

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
			required: ['name', 'typeId', 'groupId'],
			properties: {
				name: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
				typeId: {
					type: 'number',
				},
				groupId: {
					type: 'number'
				}
			},
		},
	},
	handler: create
};

const removeCategoriesRoute: RouteOptions = {
	method: 'DELETE',
	url: '/categories',
	schema: {
		body: {
			type: 'object',
			required: ['categoryId', 'groupId'],
			properties: {
				categoryId: {
					type: 'number'
				},
				groupId: {
					type: 'number'
				}
			},
		},
	},
	handler: remove
};

export { createCategoriesRoute, getCategoriesRoute, removeCategoriesRoute };
