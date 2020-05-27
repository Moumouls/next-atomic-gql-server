import { setup } from './testsHelper'
import { rawClient } from './graphql'

setup()

describe('client', () => {
	test('should query local server', async () => {
		const data: any = await rawClient.request('{health}')
		expect(data.health).toEqual(true)
	})
})
