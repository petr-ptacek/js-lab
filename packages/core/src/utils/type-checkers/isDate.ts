export function isDate(value: any): value is Date {
  return typeof value === "object" && value instanceof Date;
}
