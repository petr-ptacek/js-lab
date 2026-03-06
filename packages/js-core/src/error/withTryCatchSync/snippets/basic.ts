import { withTryCatchSync } from "@petr-ptacek/js-core";

// basic synchronous error handling
const jsonString = '{"name": "Alice", "age": 30}';

const result = withTryCatchSync(() => {
  return JSON.parse(jsonString);
});

if (result.ok) {
  console.log("Parsed successfully:", result.data);
} else {
  console.error("Parse failed:", result.error);
}
