// eslint-disable-next-line
import { MongoMemoryServer } from 'mongodb-memory-server'
import { server } from '../server'

// eslint-disable-next-line
let cachedServer: any
export const closeServer = () =>
	new Promise((resolve) => {
		if (cachedServer) {
			cachedServer.handleShutdown().then(() => {
				cachedServer.server.close(() => {
					resolve()
				})
			})
		} else {
			resolve()
		}
	})

export const startServer = async () => {
	await closeServer()
	process.env.PORT = '1340'
	process.env.PUBLIC_PARSE_URL = 'http://localhost:1340/parse'
	process.env.PUBLIC_GRAPHQL_URL = 'http://localhost:1340/graphql'
	const mongod = new MongoMemoryServer()
	const uri = await mongod.getConnectionString()
	process.env.MONGO_URL = uri
	cachedServer = await server()
}

export const setup = () => {
	beforeAll(async () => startServer())
	afterAll(async () => closeServer())
}
