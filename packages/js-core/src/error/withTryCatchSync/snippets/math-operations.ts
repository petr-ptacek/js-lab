import { withTryCatchSync } from "@petr-ptacek/js-core";

// mathematical operations with error handling
function safeDivision(a: number, b: number) {
  return withTryCatchSync(
    () => {
      if (b === 0) {
        throw new Error("Division by zero");
      }
      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error("Invalid numbers provided");
      }
      return a / b;
    },
    {
      mapError: (e) => {
        if (e instanceof Error) {
          return { code: "MATH_ERROR", message: e.message };
        }
        return { code: "UNKNOWN", message: String(e) };
      },
    },
  );
}

// Usage examples
const result1 = safeDivision(10, 2);
if (result1.ok) {
  console.log("10 / 2 =", result1.data); // 5
}

const result2 = safeDivision(10, 0);
if (!result2.ok) {
  console.error("Error:", result2.error); // { code: "MATH_ERROR", message: "Division by zero" }
}
