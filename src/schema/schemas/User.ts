export const User = {
	className: '_User',
	fields: {
		objectId: { type: 'String' },
		createdAt: {
			type: 'Date',
		},
		updatedAt: {
			type: 'Date',
		},
		ACL: { type: 'ACL' },
		email: { type: 'String' },
		authData: { type: 'Object' },
		emailVerified: { type: 'Boolean' },
		password: { type: 'String' },
		username: { type: 'String' },
		firstname: { type: 'String' },
		lastname: { type: 'String' },
		picture: { type: 'File' },
	},
	indexes: { objectId: { objectId: 1 } },
	classLevelPermissions: {
		find: { '*': true },
		count: {},
		get: { '*': true },
		update: { requiresAuthentication: true },
		create: { '*': true },
		delete: { requiresAuthentication: true },
		addField: {},
		protectedFields: {
			'*': [
				'email',
				'authData',
				'emailVerified',
				'password',
				'username',
				'lastname',
				'firstname',
			],
		},
	},
}
