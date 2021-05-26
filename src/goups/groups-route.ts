import { RouteOptions } from 'fastify';
import { create, get, update, remove } from './groups-controller';

const getGroupsRoute: RouteOptions = {
	method: 'GET',
	url: '/groups',
	handler: get
};

const createGroupsRoute: RouteOptions = {
	method: 'POST',
	url: '/groups',
	schema: {
		body: {
			type: 'object',
			required: ['name'],
			properties: {
				name: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
			},
		},
	},
	handler: create
};

const updateGroupsRoute: RouteOptions = {
	method: 'PUT',
	url: '/groups',
	schema: {
		body: {
			type: 'object',
			required: ['name', 'id'],
			properties: {
				name: {
					type: 'string',
					maxLength: 128,
					minLength: 5,
				},
				id: {
					type: 'number'
				}
			},
		},
	},
	handler: update
};

const deleteGroupsRoute: RouteOptions = {
	method: 'DELETE',
	url: '/groups',
	schema: {
		body: {
			type: 'object',
			required: ['id'],
			properties: {
				id: {
					type: 'number'
				}
			},
		},
	},
	handler: remove
};

export { getGroupsRoute, createGroupsRoute, updateGroupsRoute, deleteGroupsRoute };
