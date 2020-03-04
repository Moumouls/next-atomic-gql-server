// eslint-disable-next-line
import { MongoMemoryServer } from 'mongodb-memory-server'
// eslint-disable-next-line import/no-extraneous-dependencies
import getPort from 'get-port'
import { server } from '../server'
import { refreshClients } from './graphql'

// eslint-disable-next-line
export const closeServer = (parseServer: any) =>
	new Promise((resolve) => {
		parseServer.server.handleShutdown().then(() => {
			parseServer.server.server.close(async () => {
				await parseServer.mongo.stop()
				// eslint-disable-next-line no-param-reassign
				parseServer.server = undefined
				// eslint-disable-next-line no-param-reassign
				parseServer.mongo = undefined
				resolve()
			})
		})
	})

export const startServer = async () => {
	process.env.PORT = `${await getPort()}`
	process.env.PUBLIC_PARSE_URL = 'http://localhost:1340/parse'
	process.env.PUBLIC_GRAPHQL_URL = 'http://localhost:1340/graphql'
	const mongo = new MongoMemoryServer()
	const uri = await mongo.getConnectionString()
	process.env.MONGO_URL = uri
	refreshClients()
	return { server: await server(), mongo }
}

export const setup = () => {
	let parseServer: any
	beforeAll(async () => {
		parseServer = await startServer()
	})
	afterAll(async () => {
		await closeServer(parseServer)
	})
}
