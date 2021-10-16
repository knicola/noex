'use strict'

const noex = require('../src/index')

/** @typedef {import('../src/index').Result} Result */

/**
 * @param {Result} actual Actual result
 * @param {Array<any, Error>} expected Expected result
 * @returns {void}
 */
function toEqual(actual, expected) {
    const [ actualValue, actualError ] = actual
    const [ expectedValue, expectedError ] = expected

    expect(actualValue).toEqual(expectedValue)
    expect(actualError).toEqual(expectedError)
    expect(actual.value).toEqual(expectedValue)
    expect(actual.val).toEqual(expectedValue)
    expect(actual.error).toEqual(expectedError)
    expect(actual.err).toEqual(expectedError)
} // toEqual()

describe('Unit tests', () => {
    it('should return the result of a function', () => {
        const res = noex(() => JSON.parse('{"success":true}'))

        toEqual(res, [ { success: true } ])
    }) // test
    it('should catch and return the error of a function', () => {
        let expectedError
        try {
            JSON.parse('error')
        } catch (err) {
            expectedError = err
        }
        const res = noex(() => JSON.parse('error'))

        toEqual(res, [ undefined, expectedError ])
    }) // test
    it('should return the result of a promise', async () => {
        const res = await noex(Promise.resolve('success'))

        toEqual(res, [ 'success' ])
    }) // test
    it('should catch and return the error of a promise', async () => {
        const res = await noex(Promise.reject('error'))

        toEqual(res, [ undefined, 'error' ])
    }) // test
    it('should return error if predicate is somehow an error', () => {
        const err = new Error('oopsies')

        const res = noex(err)

        toEqual(res, [ undefined, err])
    }) // test
    it('should return value if predicate is somehow a value', () => {
        const val = 'roses are red'

        const res = noex(val)

        toEqual(res, [ val ])
    }) // test
}) // group
