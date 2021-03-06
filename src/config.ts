const server = {
	port: process.env.PORT || 80,
};

const database = {
	pg_user: process.env.PG_USER || 'postgres',
	pg_password: process.env.PG_PASSWORD || 'postgres',
	pg_database: process.env.PG_DATABASE || 'postgres',
	pg_host: process.env.PG_HOST || '127.0.0.1',
	pg_port: process.env.PG_PORT || 5432
};

const keys = {
	saltRounds: process.env.SALT_ROUNDS || 7,
};

export { server, database, keys };
