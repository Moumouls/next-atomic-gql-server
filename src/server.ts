import { ParseServer } from 'parse-server'
import ParseDashboard from 'parse-dashboard'
import './envs'
import { makeSchemas } from './schema'
import { Cloud as cloud } from './cloud'

export default () =>
	new Promise((resolve) => {
		// eslint-disable-next-line
		const serverURL = `http://localhost:${process.env.PORT}/parse`
		const server = ParseServer.start({
			databaseURI: process.env.MONGO_URL,
			cloud,
			appId: process.env.APP_ID,
			masterKey: process.env.MASTER_KEY,
			serverURL,
			graphQLPath: '/graphql',
			playgroundPath: '/playground',
			mountGraphQL: true,
			port: Number(process.env.PORT),
			startLiveQueryServer: true,
			mountPlayground: process.env.NODE_ENV !== 'production',
			serverStartComplete: async () => {
				await makeSchemas()
				resolve(server)
			},
		})

		const dashboard = new ParseDashboard(
			{
				apps: [
					{
						serverURL: process.env.PUBLIC_PARSE_URL,
						appId: process.env.APP_ID,
						masterKey: process.env.MASTER_KEY,
						appName: 'Octopus',
					},
				],
				trustProxy: true,
				users:
					process.env.NODE_ENV !== 'production'
						? undefined
						: [
								{
									user: process.env.DASHBOARD_ADMIN,
									pass: process.env.DASHBOARD_PASSWORD,
								},
						  ],
			},
			{ dev: true },
		)
		server.expressApp.use('/dashboard', dashboard)

		if (process.env.NODE_ENV !== 'production') {
			// eslint-disable-next-line
			console.log('Playground: http://localhost:1337/playground')
			// eslint-disable-next-line
			console.log('Dashboard: http://localhost:1337/dashboard')
		}
	})
