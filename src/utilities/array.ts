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
