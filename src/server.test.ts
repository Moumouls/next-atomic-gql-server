import { rawClient } from './utils/graphql'
import { server } from './server'

test('should run server', async () => {
	try {
		await server()
	} catch (e) {
		expect(e).toBeUndefined()
	}
})

test('should server be healthy', async () => {
	const query = '{ health }'
	const { health } = await rawClient.request(query)
	expect(health).toBeTruthy()
})
