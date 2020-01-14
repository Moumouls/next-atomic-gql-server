import { client } from './utils/graphql'

test('should run server', async () => {
	const query = '{ health }'
	const { health } = await client.request(query)
	expect(health).toBeTruthy()
})
