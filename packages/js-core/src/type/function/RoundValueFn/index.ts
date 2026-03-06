/**
 * Function used to round a numeric value.
 *
 * This function is applied to calculated values when scaling or
 * transforming numbers, allowing callers to control rounding behavior
 * (e.g. `Math.round`, `Math.floor`, `Math.ceil`, or a custom function).
 *
 * @param {number} value - The numeric value to be rounded
 * @returns The rounded numeric result
 *
 * @since 1.0.0
 */
export type RoundValueFn = (value: number) => number;
