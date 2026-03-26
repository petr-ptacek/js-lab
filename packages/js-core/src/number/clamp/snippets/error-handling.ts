import { clamp } from "@petr-ptacek/js-core";

// Error handling examples
console.log("=== Error Handling ===");

// Valid usage
try {
  const result = clamp(50, 0, 100);
  console.log(`✓ Valid range: clamp(50, 0, 100) = ${result}`);
} catch (error) {
  console.error(
    `✗ Error: ${error instanceof Error ? error.message : String(error)}`,
  );
}

// Invalid range - min > max
try {
  const result = clamp(50, 100, 0); // Invalid: min(100) > max(0)
  console.log(`Result: ${result}`);
} catch (error) {
  console.error(
    `✗ Invalid range: ${error instanceof Error ? error.message : String(error)}`,
  );
}

// Safe clamp wrapper with validation
function safeClamp(value: number, min: number, max: number): number | null {
  try {
    return clamp(value, min, max);
  } catch (_error) {
    console.warn(`Invalid clamp parameters: min=${min}, max=${max}`);
    return null;
  }
}

console.log("\n=== Safe Wrapper ===");

// Valid usage
const validResult = safeClamp(75, 0, 100);
console.log(`Safe clamp result: ${validResult}`); // 75

// Invalid usage - handled gracefully
const invalidResult = safeClamp(75, 200, 100);
console.log(`Safe clamp result: ${invalidResult}`); // null

// Auto-correcting clamp (swaps min/max if needed)
function autoClamp(value: number, bound1: number, bound2: number): number {
  const min = Math.min(bound1, bound2);
  const max = Math.max(bound1, bound2);

  return clamp(value, min, max);
}

console.log("\n=== Auto-correcting Clamp ===");

// Works regardless of parameter order
const result1 = autoClamp(50, 0, 100); // Normal order
const result2 = autoClamp(50, 100, 0); // Swapped order - auto-corrected

console.log(`autoClamp(50, 0, 100) = ${result1}`); // 50
console.log(`autoClamp(50, 100, 0) = ${result2}`); // 50
