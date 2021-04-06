import app from './app';
import { server as serverConf } from './config';

const port = serverConf.port;

(async (): Promise<void> => {
	try {
		await app.listen(port);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
