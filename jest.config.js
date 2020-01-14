/* eslint-disable */
const merge = require('merge')
const ts = require('ts-jest/jest-preset')

module.exports = {
	preset: 'ts-jest',
	globalSetup: './src/utils/beforeTests.ts',
	testEnvironment: 'node',
}
