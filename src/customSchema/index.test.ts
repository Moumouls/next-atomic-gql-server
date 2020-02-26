import { customSchema } from './index'

const nativeGraphQLTypes = ['Mutation', 'String', 'Boolean', 'Float', 'Int']
describe('customSchema', () => {
	test('should contains types', () => {
		const types = Object.keys(customSchema.getTypeMap())
			.filter((typeName) => typeName.indexOf('__'))
			.filter((typeName) => !nativeGraphQLTypes.includes(typeName))
			.sort()
		const expectedTypes = ['Query']
		expect(types).toEqual(expectedTypes)
	})
})
