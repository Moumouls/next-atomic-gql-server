import { extendType } from 'nexus'

export const resolvers = {
	customHello: () => 'Hello from Nexus',
}
export const Query = extendType({
	type: 'Query',
	definition: (t) => {
		t.string('customHello', { resolve: resolvers.customHello })
	},
})
