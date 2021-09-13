const server = {
	port: process.env.PORT || 8080,
	host: process.env.HOST || '0.0.0.0'
};

const database = {
	pg_user: process.env.PG_USER || 'postgres',
	pg_password: process.env.PG_PASSWORD || 'postgres',
	pg_database: process.env.PG_DATABASE || 'postgres',
	pg_host: process.env.PG_HOST || '127.0.0.1',
	pg_port: process.env.PG_PORT || 5432
};

const redisOpts = {
	redis_host: process.env.REDIS_HOST || '127.0.0.1',
	redis_port: Number(process.env.REDIS_PORT) || 6379
};

const keys = {
	saltRounds: process.env.SALT_ROUNDS || 7,
};

const cookie = {
	secret: 'cookie' || 'cookie'
};

const session = {
	expire: Number(process.env.SESSION_EXPIRE) || 60 * 60 // set in seconds
};

const mode = process.env.NODE_ENV || 'development' // development || production

export { server, database, keys, redisOpts, cookie, session, mode };
