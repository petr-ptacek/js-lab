import { withTryCatch } from "@petr-ptacek/js-core";

// basic error handling
const result = await withTryCatch(async () => {
  const response = await fetch("/api/data");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
});

if (result.ok) {
  console.log("Success:", result.data);
} else {
  console.error("Error:", result.error);
}
