import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../../generated/graphql'

// eslint-disable-next-line
export const rawClient = new GraphQLClient(`http://localhost:${process.env.PORT}/graphql`, {
	headers: {
		'X-Parse-Application-Id': process.env.APP_ID || 'test',
		'X-Parse-Master-Key': process.env.MASTER_KEY || 'test',
	},
})

export const client = getSdk(rawClient)
