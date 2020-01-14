import Parse from '../../utils/Parse'
import { User } from './User'

test('should have a valid schema', async () => {
	const cloudAddress = new Parse.Schema('_User')
	const schema: any = await cloudAddress.get()
	expect(schema.fields).toEqual(User.fields)
})
