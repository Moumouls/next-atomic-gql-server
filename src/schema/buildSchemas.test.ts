import { setup } from '../utils/testsHelper'
import { buildSchemas, lib as buildSchemasLib } from './buildSchemas'

setup()

const Toto = {
	className: 'Toto',
	fields: {
		objectId: { type: 'String' },
		createdAt: {
			type: 'Date',
		},
		updatedAt: {
			type: 'Date',
		},
		ACL: { type: 'ACL' },
		string: { type: 'String' },
		number: { type: 'Number' },
		pointer: { type: 'Pointer', targetClass: 'Pointer' },
		relation: { type: 'Relation', targetClass: 'Relation' },
		email: { type: 'String' },
	},
	indexes: {
		objectId: { objectId: 1 },
		string: { string: 1 },
		complex: { string: 1, number: 1 },
	},
	classLevelPermissions: {
		addField: {},
	},
}

beforeEach(async () => {
	await new Parse.Schema('Toto').delete()
})

describe('Fields', () => {
	test('should not overide default fields except email', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')
		const schema: any = await cloudToto.get()
		expect(schema.fields.email).toEqual(Toto.fields.email)
	})

	test('should create types', async () => {
		await buildSchemas([Toto])
		const cloudAddress = new Parse.Schema('Toto')
		const schema: any = await cloudAddress.get()
		expect(schema.fields).toEqual(Toto.fields)
	})

	test('should update types', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')
		const schema: any = await cloudToto.get()
		expect(schema.fields.email).toEqual(Toto.fields.email)

		const newToto = {
			...Toto,
			fields: { ...Toto.fields, string: { type: 'Boolean' } },
		}
		await buildSchemas([newToto])
		const updatedSchema: any = await cloudToto.get()
		expect(updatedSchema.fields.string).toEqual({ type: 'Boolean' })
	})

	test('should delete types', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')
		const schema: any = await cloudToto.get()
		expect(schema.fields.email).toEqual(Toto.fields.email)

		const { string, ...otherFields } = Toto.fields
		const newToto = { ...Toto, fields: otherFields }
		await buildSchemas([newToto])
		const updatedSchema: any = await cloudToto.get()
		expect(updatedSchema.fields.string).toEqual(undefined)
	})

	test('should update Relation', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')
		const schema: any = await cloudToto.get()
		expect(schema.fields.email).toEqual(Toto.fields.email)

		const newToto = {
			...Toto,
			fields: {
				...Toto.fields,
				address: { type: 'Relation', targetClass: 'Alert' },
			},
		}
		await buildSchemas([newToto])
		const updatedSchema: any = await cloudToto.get()
		expect(updatedSchema.fields.address).toEqual({
			type: 'Relation',
			targetClass: 'Alert',
		})
	})
	// test('we should not overide default fields on User', async () => {
	// 	await buildSchemas([lib.mock.userClass])
	// 	const cloudUser = new Parse.Schema('_User')
	// 	const schema: any = await cloudUser.get()
	// 	expect(schema.fields).toEqual(lib.expected.userClass.fields)
	// })
})

describe('Indexes', () => {
	test('should add indexes', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')

		const newToto = {
			...Toto,
			indexes: { ...Toto.indexes, email: { email: 1 } },
		}
		await buildSchemas([newToto])
		const updatedSchema: any = await cloudToto.get()
		expect(buildSchemasLib.fixCloudIndexes(updatedSchema.indexes)).toEqual(newToto.indexes)
	})

	test('should update indexes', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')
		const schema: any = await cloudToto.get()
		expect(schema.indexes).toEqual(Toto.indexes)
		let newToto: any = {
			...Toto,
			indexes: {
				...Toto.indexes,
				email: { email: 1 },
				complex: { email: 1, string: 1 },
			},
		}
		await buildSchemas([newToto])
		let updatedSchema: any = await cloudToto.get()
		expect(buildSchemasLib.fixCloudIndexes(updatedSchema.indexes)).toEqual(newToto.indexes)

		newToto = {
			...Toto,
			indexes: {
				...Toto.indexes,
				email: { email: 1 },
				complex: { email: 1, string: 1, number: 1 },
			},
		}
		await buildSchemas([newToto])
		updatedSchema = await cloudToto.get()
		expect(buildSchemasLib.fixCloudIndexes(updatedSchema.indexes)).toEqual(newToto.indexes)
	})

	test('should delete indexes', async () => {
		await buildSchemas([Toto])
		const cloudToto = new Parse.Schema('Toto')
		const schema: any = await cloudToto.get()
		expect(schema.fields).toEqual(Toto.fields)

		const newToto = {
			...Toto,
			indexes: {
				objectId: { objectId: 1 },
			},
		}
		await buildSchemas([newToto])
		const updatedSchema: any = await cloudToto.get()
		expect(buildSchemasLib.fixCloudIndexes(updatedSchema.indexes)).toEqual(newToto.indexes)
	})
})

// const lib = {
// 	mock: {
// 		userClass: {
// 			className: '_User',
// 			fields: {
// 				objectId: { type: 'WrongType' },
// 				createdAt: {
// 					type: 'WrongType',
// 				},
// 				updatedAt: {
// 					type: 'WrongType',
// 				},
// 				ACL: { type: 'WrongType' },
// 				email: { type: 'WrongType' },
// 				age: { type: 'String' },
// 			},
// 			indexes: { objectId: { objectId: 1 } },
// 		},
// 	},
// 	expected: {
// 		userClass: {
// 			className: '_User',
// 			fields: {
// 				objectId: { type: 'String' },
// 				createdAt: {
// 					type: 'Date',
// 				},
// 				updatedAt: {
// 					type: 'Date',
// 				},
// 				ACL: { type: 'ACL' },
// 				email: { type: 'String' },
// 				age: { type: 'String' },
// 				authData: { type: 'Object' },
// 				emailVerified: { type: 'Boolean' },
// 				password: { type: 'String' },
// 				username: { type: 'String' },
// 			},
// 			indexes: { objectId: { objectId: 1 } },
// 		},
// 	},
// }
