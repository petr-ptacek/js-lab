import { zip } from "@petr-ptacek/js-core";

// Mathematical operations
const values1 = [1, 2, 3, 4];
const values2 = [10, 20, 30, 40];

// Addition
const sums = zip(values1, values2, (a, b) => a + b);
console.log(sums); // [11, 22, 33, 44]

// Multiplication
const products = zip(values1, values2, (a, b) => a * b);
console.log(products); // [10, 40, 90, 160]

// String operations
const firstNames = ["John", "Jane", "Bob"];
const lastNames = ["Doe", "Smith", "Johnson"];
const fullNames = zip(
  firstNames,
  lastNames,
  (first, last) => `${first} ${last}`,
);
console.log(fullNames); // ["John Doe", "Jane Smith", "Bob Johnson"]

// Creating objects
const prices = [10.99, 25.5, 7.25];
const quantities = [2, 1, 3];
const totals = zip(prices, quantities, (price, qty) => ({
  unitPrice: price,
  quantity: qty,
  total: price * qty,
}));

console.log(totals);
// [
//   { unitPrice: 10.99, quantity: 2, total: 21.98 },
//   { unitPrice: 25.50, quantity: 1, total: 25.50 },
//   { unitPrice: 7.25, quantity: 3, total: 21.75 }
// ]
