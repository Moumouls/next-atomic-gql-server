/* istanbul ignore file */
import Parse from 'parse/node'

Parse.initialize(process.env.APP_ID!, undefined, process.env.MASTER_KEY)
// @ts-ignore
Parse.serverURL = `http://localhost:${process.env.TEST ? '1340' : process.env.PORT}/parse`

export default Parse
