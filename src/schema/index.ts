import { schemas } from './schemas'
import { buildSchemas } from './buildSchemas'

export const makeSchemas = async () => {
	try {
		await buildSchemas(schemas)
	} catch (e) {
		// eslint-disable-next-line
		console.error(e)
	}
}
