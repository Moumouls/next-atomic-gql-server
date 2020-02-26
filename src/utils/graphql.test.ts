import { client } from './graphql'

describe('client', () => {
	test('should query local server', async () => {
		const data = await client.request('{health}')
		expect(data.health).toEqual(true)
	})
})
