export function isNaNNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isNaN(value);
}
