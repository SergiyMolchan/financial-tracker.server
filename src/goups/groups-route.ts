import { RouteOptions } from 'fastify';
import { create, get } from './groups-controller';

const getGroupsRoute: RouteOptions = {
	method: 'GET',
	url: '/groups/get',
	handler: get
};

const createGroupsRoute: RouteOptions = {
	method: 'POST',
	url: '/groups/create',
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

export { getGroupsRoute, createGroupsRoute };
