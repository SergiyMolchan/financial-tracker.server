import { RouteOptions } from 'fastify';
import { create, get, update } from './financial-operations-controller';

const getOperationsRoute: RouteOptions = {
	method: 'GET',
	url: '/operation',
	handler: get
};

const createOperationsRoute: RouteOptions = {
	method: 'POST',
	url: '/operation',
	handler: create
};

const updateOperationsRoute: RouteOptions = {
	method: 'PUT',
	url: '/operation',
	handler: update
};

export { getOperationsRoute, createOperationsRoute, updateOperationsRoute };
