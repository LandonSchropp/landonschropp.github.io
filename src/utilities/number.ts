/**
 * Constrains the value to the provided range.
 * @param value The value to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns If the value is less than the minimum, the minimum is returned. If the value is greater
 * than the maximum, the maximum is returned. Otherwise, the value is returned.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
