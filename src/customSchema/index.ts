import { makeSchema } from 'nexus'
import * as Query from './Query'

export const customSchema = makeSchema({
	types: [Query],
	outputs: {
		typegen: `${__dirname}/nexusTypes.d.ts`,
	},
})
