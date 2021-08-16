import app from './app';
import { server as serverConf } from './config';

const { host, port } = serverConf;

(async (): Promise<void> => {
	try {
		console.log(`Server running on ${host}:${port}`);
		await app.listen(port, host);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
