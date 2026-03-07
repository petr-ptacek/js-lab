import { zip } from "@petr-ptacek/js-core";

// Basic array pairing
const numbers = [1, 2, 3, 4];
const letters = ["a", "b", "c"];
const pairs = zip(numbers, letters);

console.log(pairs); // [[1, "a"], [2, "b"], [3, "c"]]
// Note: 4 is ignored because letters array is shorter

// Different types
const ids = [1, 2, 3];
const names = ["Alice", "Bob", "Charlie"];
const users = zip(ids, names);

console.log(users);
// [[1, "Alice"], [2, "Bob"], [3, "Charlie"]]

// Destructuring in loops
for (const [id, name] of users) {
  console.log(`User ${id}: ${name}`);
}
