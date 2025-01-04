import { firstBy } from "remeda";

/**
 * Returns the sum of the array's values converted by the callback.
 * @param array The array to sum.
 * @param callback The callback to convert the array's values.
 * @returns The sum of the array's values.
 */
export function sum(array: number[]): number;
export function sum<T>(array: T[], callback: (item: T, index: number) => number): number;

export function sum<T>(array: T[], callback?: (item: T, index: number) => number) {
  if (callback === undefined) {
    return array.reduce((sum, item) => sum + (item as number), 0);
  }

  return array.reduce((sum, item, index) => sum + callback(item, index), 0);
}

/**
 * Returns the item from the array with the maximum value when transformed by the callback.
 * @param array The array to search.
 * @param transform The callback to transform the array's values.
 * @returns The item with the maximum value. If the array is empty, returns `undefined`.
 */
export function maxBy<T>(array: T[], transform: (item: T) => number): T | undefined {
  return firstBy(array, (item) => -transform(item));
}
