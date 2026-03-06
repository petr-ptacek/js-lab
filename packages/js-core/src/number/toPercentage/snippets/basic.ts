import { toPercentage } from "@petr-ptacek/js-core";

// basic percentage calculations
const score = toPercentage(85, 100);
console.log(`Score: ${score}%`); // Score: 85%

const completion = toPercentage(3, 4);
console.log(`Progress: ${completion}%`); // Progress: 75%

const ratio = toPercentage(1, 3);
console.log(`Ratio: ${ratio}%`); // Ratio: 33.333333333333336%
