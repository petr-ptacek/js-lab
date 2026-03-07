import { range } from "@petr-ptacek/js-core";

// Single argument - generates 0 to n-1
const numbers = range(5);
console.log(numbers); // [0, 1, 2, 3, 4]

// Two arguments - start to stop-1
const slice = range(2, 6);
console.log(slice); // [2, 3, 4, 5]

// Three arguments - with custom step
const evens = range(0, 10, 2);
console.log(evens); // [0, 2, 4, 6, 8]

// Negative step for countdown
const countdown = range(5, 0, -1);
console.log(countdown); // [5, 4, 3, 2, 1]
