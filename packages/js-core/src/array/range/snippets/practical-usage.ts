import { range } from "@petr-ptacek/js-core";

// Generate array indices for iteration
const items = ["apple", "banana", "cherry", "date", "elderberry"];
const indices = range(items.length);

console.log("Items with indices:");
indices.forEach((i: number) => {
  console.log(`${i}: ${items[i]}`);
});

// Create pagination numbers
const totalPages = 10;
const pageNumbers = range(1, totalPages + 1);

console.log("Page numbers:", pageNumbers);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Generate test data
const testUsers = range(1, 6).map((id: number) => ({
  id,
  name: `User ${id}`,
  email: `user${id}@example.com`,
  active: id % 2 === 0
}));

console.log("Test users:", testUsers);
// [
//   { id: 1, name: "User 1", email: "user1@example.com", active: false },
//   { id: 2, name: "User 2", email: "user2@example.com", active: true },
//   ...
// ]

// Create time slots (hours)
const businessHours = range(9, 18).map((hour: number) => `${hour}:00`);
console.log("Business hours:", businessHours);
// ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
