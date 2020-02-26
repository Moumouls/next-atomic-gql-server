import './envs'

test('should keep envs', () => {
	expect(process.env.PORT).toEqual('1340')
})
