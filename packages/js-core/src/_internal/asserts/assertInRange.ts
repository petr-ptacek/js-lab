import { createAssertMessage } from "./_utils_";

export function assertInRange(
  name: string,
  value: number,
  min: number,
  max: number,
): void {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new Error(
      createAssertMessage(
        name,
        `${name} must be in range ${min}..${max}`,
        value,
      ),
    );
  }
}
