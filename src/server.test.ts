import { rawClient } from './utils/graphql'
import { startServer, closeServer } from './utils/testsHelper'

describe('server', () => {
	test('should run server', async () => {
		try {
			await startServer()
		} catch (e) {
			expect(e).toBeUndefined()
		}
		await closeServer()
	})

	test('should server be healthy', async () => {
		await startServer()
		const query = '{ health }'
		const { health } = await rawClient.request(query)
		expect(health).toBeTruthy()
		await closeServer()
	})
})
