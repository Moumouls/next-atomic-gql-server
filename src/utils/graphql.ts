import { GraphQLClient } from 'graphql-request'
import { getSdk } from '../../generated/graphql'

// eslint-disable-next-line
export let rawClient = new GraphQLClient(`http://localhost:${process.env.PORT}/graphql`, {
	headers: {
		'X-Parse-Application-Id': process.env.APP_ID || 'dev',
		'X-Parse-Master-Key': process.env.MASTER_KEY || 'dev',
	},
})

// eslint-disable-next-line
export let client = getSdk(rawClient)

export const refreshClients = () => {
	rawClient = new GraphQLClient(`http://localhost:${process.env.PORT}/graphql`, {
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID || 'dev',
			'X-Parse-Master-Key': process.env.MASTER_KEY || 'dev',
		},
	})
	client = getSdk(rawClient)
}
