import { clamp } from "@petr-ptacek/js-core";

// Basic clamping examples
console.log("=== Basic Clamping ===");

// Value within range - unchanged
const withinRange = clamp(5, 0, 10);
console.log(`clamp(5, 0, 10) = ${withinRange}`); // 5

// Value above maximum - clamped to max
const aboveMax = clamp(15, 0, 10);
console.log(`clamp(15, 0, 10) = ${aboveMax}`); // 10

// Value below minimum - clamped to min
const belowMin = clamp(-3, 0, 10);
console.log(`clamp(-3, 0, 10) = ${belowMin}`); // 0

// Edge cases - boundary values
const exactMin = clamp(0, 0, 10);
console.log(`clamp(0, 0, 10) = ${exactMin}`); // 0

const exactMax = clamp(10, 0, 10);
console.log(`clamp(10, 0, 10) = ${exactMax}`); // 10
