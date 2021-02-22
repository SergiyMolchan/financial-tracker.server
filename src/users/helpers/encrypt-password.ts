import bcrypt from 'bcryptjs';
import { keys } from '../../config';

const { saltRounds } = keys;

async function encryptPassword(password: string): Promise<string> {
	const salt = await bcrypt.genSalt(saltRounds as number);
	return await bcrypt.hash(password, salt);
}

async function checkPassword(password: string, hash: string): Promise<boolean> {
	return await bcrypt.compare(password, hash);
}

export { encryptPassword, checkPassword };
