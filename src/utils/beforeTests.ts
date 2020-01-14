// eslint-disable-next-line
import { MongoMemoryServer } from 'mongodb-memory-server'
import server from '../server'

// eslint-disable-next-line
let cachedServer: any

export default async () => {
	if (!cachedServer) {
		const mongod = new MongoMemoryServer()
		const uri = await mongod.getConnectionString()
		process.env.MONGO_URL = uri
		cachedServer = await server()
	}
}
