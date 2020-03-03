import { rawClient } from './utils/graphql'
import { startServer, closeServer } from './utils/testsHelper'

describe('server', () => {
	test('should run server', async () => {
		let server
		try {
			server = await startServer()
		} catch (e) {
			expect(e).toBeUndefined()
		}
		await closeServer(server)
	})

	test('should server be healthy', async () => {
		const server = await startServer()
		const query = '{ health }'
		const { health } = await rawClient.request(query)
		expect(health).toBeTruthy()
		await closeServer(server)
	})
})
