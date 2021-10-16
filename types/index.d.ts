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
export function noex<T>(predicate: Promise<any>): Promise<Result<T, Error>>;
export function noex<T>(predicate: Function): Result<T, Error>;

export default noex;
