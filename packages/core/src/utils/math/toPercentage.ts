export function toPercentage(value: number, base: number): number {
  if ( base === 0 ) return 0;
  return (value / base) * 100;
}
