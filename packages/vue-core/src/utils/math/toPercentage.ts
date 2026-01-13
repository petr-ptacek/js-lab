export function toPercentage(value: number, base: number): number {
  if (base === 0) {
    throw new Error("toPercentage: base must not be 0");
  }

  return (value / base) * 100;
}
