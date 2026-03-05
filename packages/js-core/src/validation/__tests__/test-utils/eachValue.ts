export function eachValue<T>(values: readonly T[]): [T][] {
  if ( !Array.isArray(values) ) {
    throw new TypeError("eachValue expects an array");
  }

  return values.map(value => [value]);
}
