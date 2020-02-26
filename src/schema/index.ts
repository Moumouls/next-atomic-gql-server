import { schemas } from './schemas'
import { buildSchemas } from './buildSchemas'

export const makeSchemas = async () => buildSchemas(schemas)
