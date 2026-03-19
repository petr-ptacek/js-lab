import { createAssertMessage } from "./_utils_";

export function assertPositiveFinite(name: string, value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      createAssertMessage(name, "a positive finite number", value),
    );
  }
}
