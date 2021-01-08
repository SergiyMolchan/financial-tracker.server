import bcrypt from 'bcryptjs';
import { keys } from '../../config';

const { saltRounds } = keys;

const encryptPassword = async (password: string): Promise<string> => {
	const salt = await bcrypt.genSalt(saltRounds as number);
	return await bcrypt.hash(password, salt);
};

const checkPassword = async (password: string, hash: string): Promise<boolean> => {
	return await bcrypt.compare(password, hash);
};

export { encryptPassword, checkPassword };
