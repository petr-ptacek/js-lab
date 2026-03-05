import { entries } from "@petr-ptacek/js-core";

const original = {
  a: 1,
  b: 2,
  c: 3,
};

// Transform object values while preserving types
const doubled = Object.fromEntries(
  entries(original).map(([key, value]) => [key, value * 2])
);

console.log(doubled);
// Output: { a: 2, b: 4, c: 6 }
