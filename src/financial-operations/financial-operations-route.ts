import { RouteOptions } from 'fastify';
import { create, get, update, remove } from './financial-operations-controller';

const getOperationsRoute: RouteOptions = {
	method: 'GET',
	url: '/operation',
	handler: get
};

const createOperationsRoute: RouteOptions = {
	method: 'POST',
	url: '/operation',
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
				},
				categoryId: {
					type: 'number'
				},
				currencyId: {
					type: 'number'
				},
				sum: {
					type: 'number'
				},
				description: {
					type: 'string',
					maxLength: 256,
					minLength: 1,
				},
				dateTime: {
					type: 'number'
				}
			},
		},
	},
	handler: create
};

const updateOperationsRoute: RouteOptions = {
	method: 'PUT',
	url: '/operation',
	handler: update
};

const removeOperationsRoute: RouteOptions = {
	method: 'DELETE',
	url: '/operation',
	handler: remove
};

export { getOperationsRoute, createOperationsRoute, updateOperationsRoute, removeOperationsRoute };
