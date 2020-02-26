import { resolvers } from './Query'

describe('customHelloQueryField', () => {
	test('should return hello from nexus', () => {
		expect(resolvers.customHello()).toEqual('Hello from Nexus')
	})
})
