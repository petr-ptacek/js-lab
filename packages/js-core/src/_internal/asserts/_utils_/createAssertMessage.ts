export function createAssertMessage(
  name: string,
  constraint: string,
  value: unknown,
): string {
  return `${name} must be ${constraint}, got: ${String(value)}`;
}
