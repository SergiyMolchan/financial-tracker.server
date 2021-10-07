import app from  '../app';

describe('users route', () => {
	test('should be return passwords must match', async () => {
		const response = await app.inject({
			method: 'POST',
			url: '/user/registration',
			payload: {
				login: 'user',
				password: '1234567',
				confirmPassword: '123456'
			}
		});
		expect(JSON.parse(response.body)).toEqual({
			success: false,
			message: 'Passwords must match. '
		});
	});
});

