'use strict'

const isPromise  = value => value instanceof Promise
const isThenable = value => value && value.then
const isFunction = value => typeof value === 'function'

/**
 * The object to hold the resulting value or error of a function, promise or thenable.
 */
class Result extends Array {
    /**
     * @param {any} value Value
     * @param {Error} error Error
     */
    constructor(value, error) {
        super(value, error)
        this.value = this.val = value
        this.error = this.err = error
    }
} // class

/**
 * Resolve a promise with then-catch blocks and return result.
 *
 * @param {Promise<any>} promise Promise
 * @returns {Promise<Result<any, Error>>} Result
 */
function resolve(promise) {
    return promise
        .then(val => (new Result(val)))
        .catch(err => (new Result(undefined, err)))
}

/**
 * Call function in a try-catch block and return result.
 *
 * @param {Function} fn Function
 * @param {...any} args Arguments
 * @returns {Result<any, Error>} Result
 */
function call(fn, ...args) {
    try {
        const res = fn(...args)

        return isPromise(res) || isThenable(res)
            ? resolve(res)
            : new Result(res)
    } catch (err) {
        return new Result(undefined, err)
    }
}

/**
 * Wrap a function that returns a promise.
 *
 * @param {(...args: any[]) => Promise<any>} predicate Function
 * @returns {(...args: any[]) => Promise<Result<any, Error>>} Function
 * @example
 * const readFile = noex.wrap(function (file) {
 *     return fs.promises.readFile(file)
 * })
 *
 * const [ content, error ] = await readfile('path/to/file')
 *//**
 * Wrap a function with noex.
 *
 * @param {(...args: any[]) => any} predicate Function
 * @returns {(...args: any[]) => Result<any, Error>} Function
 * @example
 * const parseJson = noex.wrap(JSON.parse)
 *
 * const [ json, error ] = parseJson('{ "identity": "Bourne" }')
 */
function wrap(predicate) {
    return (...args) => call(predicate, ...args)
}

/**
 * Run the given predicates in sequence, passing the result of each predicate to the next one in the list.
 *
 * @param {Array<(...args: any[]) => any>} predicates List of functions and/or promises
 * @returns {Promise<Result<any, Error>>} Result
 * @example
 * const [ val, err ] = await noex([
 *     ()  => JSON.parse('{ "identity": "Bourne" }'),
 *     json => json.identity.toUpperCase(),
 * ])
 * console.log(val) //=> "BOURNE"
 */
async function chain(predicates) {
    let out
    for (const predicate of [].concat(predicates || [])) {
        out = await call(predicate, (out || {}).value)

        if (out.error) {
            return out
        }
    }
    return out
}

/**
 * Run a series of functions, promises and/or thenables and return their results.
 *
 * @param {Array<Promise<any>|Function>} predicate List of predicates
 * @returns {Promise<Array<Result<any, Error>>>} List of results
 * @example
 * const [ res1, res2 ] = await noex([
 *     () => JSON.parse('{ "identity": "Bourne" }'),
 *     fs.promises.readFile('path/to/file')
 * ])
 *//**
 * Run a promise or thenable in a try-catch block and return the result.
 *
 * @param {Promise<any>} predicate Predicate
 * @returns {Promise<Result<any, Error>>} Result
 * @example
 * const [ content, error ] = await noex(
 *     fs.promises.readFile('path/to/file')
 * )
 *//**
 * Run a function in a try-catch block and return the result.
 *
 * @param {Function} predicate Predicate
 * @returns {Result<any, Error>} Result
 * @example
 * const [ json, error ] = noex(function () {
 *     return JSON.parse('{ "identity": "Bourne" }')
 * })
 */
function noex(predicate) {
    // Promise or Thenable
    if (isPromise(predicate) || isThenable(predicate)) {
        return resolve(predicate)
    }

    if (isFunction(predicate)) {
        return call(predicate)
    }

    if (Array.isArray(predicate)) {
        return Promise.all(predicate.map(noex))
    }

    if (predicate instanceof Error) {
        return new Result(undefined, predicate)
    }

    return new Result(predicate)
}

noex.wrap = wrap
noex.chain = chain

module.exports = noex
// Allows for named import
module.exports.noex = noex
// Allows for strict ES Module support
module.exports.default = noex

module.exports.Result = Result
