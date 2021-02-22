import fastify from 'fastify';
import { server as serverConf } from './config';

const port = serverConf.port;
const app = fastify({logger: true});

(async (): Promise<void> => {
	try {
		await app.listen(port)
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();

