import { createAssertMessage } from "./_utils_";

export function assertInteger(
  name: string,
  value: number,
): void {
  if (!Number.isInteger(value)) {
    throw new Error(
      createAssertMessage(
        name,
        "must be an integer",
        value,
      ),
    );
  }
}
