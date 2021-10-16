'use strict'

/**
 * The object to hold the resulting value or error of a function, promise or thenable.
 */
class Result extends Array {
    /**
     * @param {any} value Value
     * @param {Error} error Error
     * @returns {Result<T, Error>} Result
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
 * @returns {Promise<Result<T, Error>>} Result
 */
function resolve(promise) {
    return promise
        .then(val => (new Result(val)))
        .catch(err => (new Result(undefined, err)))
}

/**
 * Call function in a try-catch block and return result.
 *
 * @param {Function} func Function
 * @returns {Result<T, Error>} Result
 */
function call(func) {
    try {
        return new Result(func())
    } catch (err) {
        return new Result(undefined, err)
    }
}

/**
 * Run a function, promise or thenable in a try-catch block and return the result.
 *
 * @param {Promise<any> | Function} predicate Predicate
 * @returns {Promise<Result<T, Error>> | Result<T, Error>} Result
 */
function noex(predicate) {
    // Promise or Thenable
    if (predicate instanceof Promise || (predicate && predicate.then)) {
        return resolve(predicate)
    }

    if (typeof predicate === 'function') {
        return call(predicate)
    }

    if (predicate instanceof Error) {
        return new Result(undefined, predicate)
    }

    return new Result(predicate)
}

module.exports = noex
// Allows for named import
module.exports.noex = noex
// Allows for strict ES Module support
module.exports.default = noex

module.exports.Result = Result
