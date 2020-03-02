import { rawClient } from '@graphql'

describe('client', () => {
	test('should query local server', async () => {
		const data = await rawClient.request('{health}')
		expect(data.health).toEqual(true)
	})
})
