import { v4 as uuid } from 'uuid';
import { cache } from '../databases';

async function createSession(userId: number, expire: number): Promise<string> {
	const sessionId: string = uuid();
	await new Promise((resolve, reject) => {
		cache.set(sessionId, String(userId), 'EX', expire, (err, res): void => {
			if (err) reject(err);
			resolve(res);
		});
	});

	return sessionId;
}

async function getUserIdBySessionId(sessionId: string): Promise<number> {
	return new Promise((resolve, reject) => {
		cache.get(sessionId, (err, res): void => {
			if (err) reject(err);
			resolve(Number(res));
		});
	});
}

export { createSession, getUserIdBySessionId };
