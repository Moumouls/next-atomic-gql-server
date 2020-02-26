/* istanbul ignore file */

const envs: any = {
	MONGO_URL: 'mongodb://localhost:27017/parse',
	PUBLIC_PARSE_URL: 'http://localhost:1337/parse',
	PUBLIC_GRAPHQL_URL: 'http://localhost:1337/graphql',
	DASHBOARD_ADMIN: 'admin',
	DASHBOARD_PASSWORD: 'admin',
	PORT: 1337,
	APP_ID: 'dev',
	MASTER_KEY: 'dev',
}

Object.keys(envs).forEach((e) => {
	if (process.env.NODE_ENV === 'production') {
		if (!process.env[e]) throw new Error(`Env var ${e} is needed`)
	} else if (!process.env[e]) {
		// eslint-disable-next-line
		if (!process.env.TEST) console.log(`Auto set env ${e} to ${envs[e]}`)
		process.env[e] = envs[e]
	}
})
