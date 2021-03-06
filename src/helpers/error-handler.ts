import { FastifyReply } from 'fastify';

interface errorInterface {
	status: number,
	message: string
}

function errorHandler(reply: FastifyReply, error: string): void {
	console.log(error);
	const { status, message }: errorInterface = JSON.parse(error);
	reply
		.code(status)
		.header('Content-Type', 'application/json; charset=utf-8')
		.send(JSON.stringify({
			success: false,
			message: message
		}));
}

export { errorHandler };
