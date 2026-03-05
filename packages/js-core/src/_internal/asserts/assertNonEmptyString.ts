import { createAssertMessage } from "./_utils_";

export function assertNonEmptyString(
  name: string,
  value: string,
): void {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(
      createAssertMessage(name, "must be a non-empty string", value),
    );
  }
}
