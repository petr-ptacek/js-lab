import { range } from "@petr-ptacek/js-core";

// Generate multiples of 3
const multiplesOf3 = range(0, 30, 3);
console.log(multiplesOf3); // [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

// Generate odd numbers
const odds = range(1, 20, 2);
console.log(odds); // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

// Create squares using map
const squares = range(1, 6).map((x: number) => x * x);
console.log(squares); // [1, 4, 9, 16, 25]

// Generate Fibonacci-like sequence using reduce
const fibonacci = range(10).reduce((acc, i) => {
  if (i === 0) {
    acc.push(0);
  } else if (i === 1) {
    acc.push(1);
  } else {
    const prev1 = acc[i - 1];
    const prev2 = acc[i - 2];
    if (prev1 !== undefined && prev2 !== undefined) {
      acc.push(prev1 + prev2);
    }
  }
  return acc;
}, [] as number[]);
console.log(fibonacci); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
