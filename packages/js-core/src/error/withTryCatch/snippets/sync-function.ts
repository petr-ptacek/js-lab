import { withTryCatch } from "@petr-ptacek/js-core";

// synchronous function handling
const parseResult = await withTryCatch(
  () => {
    return JSON.parse(jsonString);
  },
  {
    mapError: (e) => {
      if (e instanceof SyntaxError) {
        return { type: "PARSE_ERROR", message: e.message };
      }
      return { type: "UNKNOWN_ERROR", message: String(e) };
    },
  },
);

if (parseResult.ok) {
  console.log("Parsed data:", parseResult.data);
} else {
  console.log("Parse failed:", parseResult.error);
}

const jsonString = '{"name": "test"}'; // or invalid JSON
