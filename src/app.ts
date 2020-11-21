import express from 'express';
import { server as serverConf } from './config';

const app = express();
const port = serverConf.port;

app.listen(port, () => {
	console.log(`Server listen port: ${port}`);
});
