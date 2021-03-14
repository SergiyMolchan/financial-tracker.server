import { FastifyReply } from "fastify";

interface errorInterface {
	status: number,
	message: string
}

function errorHandler(reply: FastifyReply, { status, message }: errorInterface): void {
	reply
		.code(status)
		.send({
			success: false,
			message: message
		});
}

export {errorHandler}
