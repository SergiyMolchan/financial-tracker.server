import { Response } from 'express';

interface errorInterface {
	status: number,
	message: string
}

export default (res: Response, { status, message }: errorInterface): void => {
	res.status(status).json({
		success: false,
		message: message
	});
};
