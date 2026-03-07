import { zip } from "@petr-ptacek/js-core";

// Coordinate operations
const xCoords = [1, 2, 3, 4, 5];
const yCoords = [10, 20, 30, 40, 50];

// Create point objects
const points = zip(xCoords, yCoords, (x, y) => ({ x, y }));
console.log(points);
// [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 30 }, ...]

// Calculate distances from origin
const distances = zip(xCoords, yCoords, (x, y) => Math.sqrt(x * x + y * y));
console.log(distances); // [10.05, 20.1, 30.15, ...]

// Data merging from parallel arrays
const userIds = [1, 2, 3];
const userEmails = ["alice@example.com", "bob@example.com", "charlie@example.com"];
const userRoles = ["admin", "user", "moderator"];

// Merge into user objects (using nested zip)
const users = zip(userIds, userEmails).map(([id, email], index) => ({
  id,
  email,
  role: userRoles[index]
}));

console.log(users);
// [
//   { id: 1, email: "alice@example.com", role: "admin" },
//   { id: 2, email: "bob@example.com", role: "user" },
//   { id: 3, email: "charlie@example.com", role: "moderator" }
// ]

// Form validation - check field values against rules
const formValues = ["john@email.com", "password123", "John"];
const validationRules = [
  (val: string) => val.includes("@"),
  (val: string) => val.length >= 8,
  (val: string) => val.length > 0
];

const validationResults = zip(formValues, validationRules, (value, rule) => ({
  value,
  isValid: rule(value)
}));

console.log(validationResults);
// [
//   { value: "john@email.com", isValid: true },
//   { value: "password123", isValid: true },
//   { value: "John", isValid: true }
// ]
