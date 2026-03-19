import { createAssertMessage } from "./_utils_";

export function assertNonUndefined<T>(
  name: string,
  value: T,
): asserts value is Exclude<T, undefined> {
  if (value === undefined) {
    throw new Error(
      createAssertMessage(name, "not undefined", value),
    );
  }
}
