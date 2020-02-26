import { server } from './server'
import { client } from './utils/graphql'

test('should run server', async () => {
	try {
		await server()
	} catch (e) {
		expect(e).toBeUndefined()
	}
})

test('should server be healthy', async () => {
	const query = '{ health }'
	const { health } = await client.request(query)
	expect(health).toBeTruthy()
})
