import { parseJSONSafe } from "@petr-ptacek/js-core";

// basic JSON parsing without fallback
const jsonString = '{"name": "Alice", "age": 30}';

const result = parseJSONSafe<{name: string; age: number}>(jsonString);

if (result) {
  console.log("Name:", result.name);
  console.log("Age:", result.age);
} else {
  console.log("Failed to parse JSON");
}

// invalid JSON without fallback
const invalidJson = '{"name": "Alice", "age":}'; // missing value
const invalidResult = parseJSONSafe(invalidJson);
console.log(invalidResult); // undefined
