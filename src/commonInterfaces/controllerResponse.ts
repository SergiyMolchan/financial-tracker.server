// todo: refactor in future

import { OutgoingHttpHeaders } from 'http';
import { CookieSerializeOptions } from 'fastify-cookie';

export interface ControllerResponse {
	status: number,
	headers: OutgoingHttpHeaders,
	cookie?: [string, string, CookieSerializeOptions],
	body: {
		success: boolean,
		message?: string,
		data?: any,
		error?: ControllerError
	}
}

export interface ControllerError {
	errors: any
	message: string,
}
