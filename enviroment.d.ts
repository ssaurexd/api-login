declare global {

	namespace NodeJS {

		interface ProcessEnv {
			PORT: string;
			MONGO_URL: string;
			BASE_PATH: string;
			JWT_SEED: string;
			SESSION_SECRET: string;
			NODE_ENV: 'development' | 'production'
		}
	}
}

export {}