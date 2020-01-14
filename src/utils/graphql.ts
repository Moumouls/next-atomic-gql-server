import { GraphQLClient } from 'graphql-request'

// eslint-disable-next-line
export const client = new GraphQLClient(`http://localhost:${process.env.PORT}/graphql`, {
	headers: {
		'X-Parse-Application-Id': process.env.APP_ID || 'test',
		'X-Parse-Master-Key': process.env.MASTER_KEY || 'test',
	},
})
