import { encryptPassword, checkPassword } from './encrypt-password';

jest.mock('../../config', () => ({ keys: { saltRounds: 4 } }));

describe('check encrypting and verifying passwords', () => {

	test('should be return hash from password', async () => {
		expect(!!await encryptPassword('password')).toBe(true);
	});

	test('should be return boolean after check password', async () => {
		expect(await checkPassword('password', await encryptPassword('password'))).toBe(true);
		expect(await checkPassword('password', 'password')).toBe(false);
		expect(await checkPassword('password', '')).toBe(false);
	});
});
