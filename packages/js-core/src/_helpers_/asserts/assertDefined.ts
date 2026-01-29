import { createAssertMessage } from "./_utils_";

export function assertDefined<T>(
  name: string,
  value: T,
): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(
      createAssertMessage(name, "defined", value),
    );
  }
}
