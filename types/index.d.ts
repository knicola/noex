/**
 * The object to hold the resulting value (or error) of a function, promise or thenable.
 */
export class Result<T, Error> extends Array<any> {
    constructor(value: any, error: Error);
    value: T;
    val: T;
    error: Error;
    err: Error;
}

/**
 * Run a function, promise or thenable in a try-catch block and return the result.
 *
 * @param predicate Predicate
 */
export function noex<T>(predicate: Promise<T>): Promise<Result<T, Error>>;
export function noex<T>(predicate: Function): Result<T, Error>;

export module noex {
    /**
     * Wrap a function with noex.
     *
     * @param fn Function
     */
    export function wrap<A extends any[], R>(fn: (...args: A) => Promise<R>): (...args: A) => Promise<Result<R, Error>>
    export function wrap<A extends any[], R>(fn: (...args: A) => R): (...args: A) => Result<R, Error>
}

export default noex;
