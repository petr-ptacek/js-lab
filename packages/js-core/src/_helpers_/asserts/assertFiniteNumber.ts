import { createAssertMessage } from "./_utils_";

export function assertFiniteNumber(
  name: string,
  value: number,
): void {
  if (!Number.isFinite(value)) {
    throw new Error(
      createAssertMessage(
        name,
        "must be a finite number",
        value,
      ),
    );
  }
}
