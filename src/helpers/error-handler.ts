import { Response } from 'express';

// rebuild error obj
export default (res: Response, error: any): void => {
	res.status(500).json({
		success: false,
		message: error.message ? error.message : error
	});
};
