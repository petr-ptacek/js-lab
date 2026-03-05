import { createAssertMessage } from "./_utils_";

export function assertNonNull<T>(
  name: string,
  value: T,
): asserts value is Exclude<T, null> {
  if (value === null) {
    throw new Error(
      createAssertMessage(name, "not null", value),
    );
  }
}
