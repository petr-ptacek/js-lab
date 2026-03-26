import { shuffle } from "@petr-ptacek/js-core";

// Basic array shuffling
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);

console.log("Original:", numbers); // [1, 2, 3, 4, 5]
console.log("Shuffled:", shuffledNumbers); // e.g., [3, 1, 5, 2, 4]

// String array
const words = ["hello", "world", "foo", "bar"];
const shuffledWords = shuffle(words);

console.log("Original words:", words); // ["hello", "world", "foo", "bar"]
console.log("Shuffled words:", shuffledWords); // e.g., ["bar", "hello", "foo", "world"]

// Object array
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const shuffledUsers = shuffle(users);
console.log("Shuffled users:", shuffledUsers);
// e.g., [{ id: 3, name: "Charlie" }, { id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
