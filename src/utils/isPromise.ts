/**
 * Copy from p-is-promise which only support ESM
 * @see https://www.npmjs.com/package/p-is-promise
 */
export const isPromise = <T>(value: any): value is Promise<T> => {
  return (
    value instanceof Promise ||
    (value !== null &&
      (typeof value === 'object' || typeof value === 'function') &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function')
  );
};
