import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../../generated/graphql'

// eslint-disable-next-line
export const rawClient = new GraphQLClient(
	`http://localhost:${process.env.PORT || process.env.TEST ? 1340 : undefined}/graphql`,
	{
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID || 'dev',
			'X-Parse-Master-Key': process.env.MASTER_KEY || 'dev',
		},
	},
)

export const client = getSdk(rawClient)
