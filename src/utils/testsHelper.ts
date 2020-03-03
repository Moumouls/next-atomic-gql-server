// eslint-disable-next-line
import { MongoMemoryServer } from 'mongodb-memory-server'
import { server } from '../server'

// eslint-disable-next-line
export const closeServer = (parseServer: any) =>
	new Promise((resolve) => {
		parseServer.handleShutdown().then(() => {
			parseServer.server.close(() => {
				resolve()
			})
		})
	})

export const startServer = async () => {
	process.env.PORT = '1340'
	process.env.PUBLIC_PARSE_URL = 'http://localhost:1340/parse'
	process.env.PUBLIC_GRAPHQL_URL = 'http://localhost:1340/graphql'
	const mongod = new MongoMemoryServer()
	const uri = await mongod.getConnectionString()
	process.env.MONGO_URL = uri
	return server()
}

export const setup = () => {
	let parseServer: any
	beforeAll(async () => {
		parseServer = await startServer()
	})
	afterAll(async () => {
		await closeServer(parseServer)
		parseServer = undefined
	})
}
