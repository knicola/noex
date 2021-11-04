/**
 * The object to hold the resulting value or error of a function, promise or thenable.
 */
export class Result<T, Error> extends Array<any> {
    /**
     * @param value Value
     * @param error Error
     */
    constructor(value: any, error: Error);
    value: T;
    val: T;
    error: Error;
    err: Error;
}

/**
 * Run a series of functions, promises and/or thenables and return their results.
 *
 * @param predicate List of predicates
 * @returns List of results
 * @example
 * const [ res1, res2 ] = await noex([
 *     () => JSON.parse('{ "identity": "Bourne" }'),
 *     fs.promises.readFile('path/to/file')
 * ])
 */
export function noex<T>(predicate: Array<Promise<T>|Function>): Promise<Array<Result<T, Error>>>;
/**
 * Run a promise or thenable in a try-catch block and return the result.
 *
 * @param predicate Predicate
 * @returns Result
 * @example
 * const [ content, error ] = await noex(
 *     fs.promises.readFile('path/to/file')
 * )
 */
export function noex<T>(predicate: Promise<T>): Promise<Result<T, Error>>;
/**
 * Run a function in a try-catch block and return the result.
 *
 * @param predicate Predicate
 * @returns Result
 * @example
 * const [ json, error ] = noex(function () {
 *     return JSON.parse('{ "identity": "Bourne" }')
 * })
 */
export function noex<T>(predicate: Function): Result<T, Error>;

export module noex {
    /**
     * Wrap a function that returns a promise.
     *
     * @param fn Function
     * @example
     * const readFile = noex.wrap(function (file) {
     *     return fs.promises.readFile(file)
     * })
     *
     * const [ content, error ] = await readfile('path/to/file')
     */
    export function wrap<A extends any[], R>(fn: (...args: A) => Promise<R>): (...args: A) => Promise<Result<R, Error>>
    /**
     * Wrap a function with noex.
     *
     * @param fn Function
     * @example
     * const parseJson = noex.wrap(JSON.parse)
     *
     * const [ json, error ] = parseJson('{ "identity": "Bourne" }')
     */
    export function wrap<A extends any[], R>(fn: (...args: A) => R): (...args: A) => Result<R, Error>
}

export default noex;
