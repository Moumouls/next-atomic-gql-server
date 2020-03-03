import { ParseServer, S3Adapter } from 'parse-server'
import ParseDashboard from 'parse-dashboard'
import { Endpoint as S3Endpoint } from 'aws-sdk'
import './envs'
import { makeSchemas } from './schema'
import { Cloud as cloud } from './cloud'
import { customSchema } from './customSchema'

export const server = () =>
	new Promise((resolve) => {
		// eslint-disable-next-line
		const serverURL = `http://localhost:${process.env.PORT}/parse`
		const parseServer = ParseServer.start({
			databaseURI: process.env.MONGO_PASSWORD
				? process.env.MONGO_URL!.replace(
						'mongodb://',
						`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`,
				  )
				: process.env.MONGO_URL,
			cloud,
			filesAdapter: process.env.S3_ENDPOINT
				? new S3Adapter({
						bucket: process.env.S3_BUCKET,
						region: '',
						directAccess: false,
						s3overrides: {
							accessKeyId: process.env.S3_ACCESS_KEY,
							secretAccessKey: process.env.S3_SECRET_KEY,
							endpoint: new S3Endpoint(process.env.S3_BUCKET!),
						},
				  })
				: undefined,
			appId: process.env.APP_ID,
			masterKey: process.env.MASTER_KEY,
			serverURL,
			silent: !!process.env.TEST,
			graphQLSchema: customSchema,
			graphQLPath: '/graphql',
			playgroundPath: '/playground',
			mountGraphQL: true,
			port: Number(process.env.PORT),
			startLiveQueryServer: true,
			mountPlayground: process.env.NODE_ENV !== 'production',
			serverStartComplete: async () => {
				await makeSchemas()
				resolve(parseServer)
			},
		})

		const dashboard = new ParseDashboard(
			{
				apps: [
					{
						serverURL: process.env.PUBLIC_PARSE_URL,
						appId: process.env.APP_ID,
						masterKey: process.env.MASTER_KEY,
						appName: 'PeopleVox',
						graphQLServerURL: process.env.PUBLIC_GRAPHQL_URL,
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
			{ dev: true, cookieSessionSecret: process.env.DASHBOARD_SESSION_SECRET || 'test' },
		)
		parseServer.expressApp.use('/dashboard', dashboard)

		/* istanbul ignore next */
		if (process.env.NODE_ENV !== 'production') {
			if (!process.env.TEST) {
				// eslint-disable-next-line
				console.log(`Playground: http://localhost:${process.env.PORT}/playground`)
				// eslint-disable-next-line
				console.log(`Dashboard: http://localhost:${process.env.PORT}/dashboard`)
			}
		}
	})
