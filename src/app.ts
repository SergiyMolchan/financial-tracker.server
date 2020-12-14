import express from 'express';
import { server as serverConf } from './config';

const app = express();
const port = serverConf.port;

const start = (): void => {
	try {
		app.listen(port, () => {
			console.log(`Server listen port: ${port}`);
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();

