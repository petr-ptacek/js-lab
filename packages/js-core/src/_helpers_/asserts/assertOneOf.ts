import { createAssertMessage } from "./_utils_";

export function assertOneOf<T extends readonly unknown[]>(
  name: string,
  value: unknown,
  allowed: T,
): asserts value is T[number] {
  if (!allowed.includes(value)) {
    throw new Error(
      createAssertMessage(
        name,
        `must be one of [${allowed.join(", ")}]`,
        value,
      ),
    );
  }
}
