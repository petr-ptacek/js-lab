---
title: toPercentage
category: number
tags:
  - percentage
  - math
  - calculation
  - conversion
since: 1.0.0
---


> **Category:** number
> **Since:** 1.0.0
> **Tags:** percentage, math, calculation, conversion


# toPercentage

Converts a numeric value to a percentage relative to a given base.

## Usage

```ts
import { toPercentage } from "@petr-ptacek/js-core"

const percentage = toPercentage(25, 100)
console.log(percentage) // 25

const result = toPercentage(3, 4)
console.log(result) // 75
```

## Why This Utility Exists

Converting values to percentages is a common operation in data visualization, progress indicators, and statistical calculations. While the math is simple `(value / base) * 100`, this utility provides a consistent, well-tested function with proper error handling for edge cases like division by zero.

## Signature

```ts
function toPercentage(value: number, base: number): number
```

## Parameters

- `value` (`number`): The value to convert into a percentage.
- `base` (`number`): The base value representing 100%. Must not be 0.

## Return Type

Returns a `number` representing the calculated percentage value.

## Throws

- Throws `Error` when `base` is 0 (division by zero).

## Design Notes

The function performs a simple mathematical calculation `(value / base) * 100` with validation to prevent division by zero. The implementation prioritizes:

1. **Input validation**: Checks for zero base to prevent `Infinity` results
2. **Clear error messages**: Provides descriptive error when invalid input is detected
3. **Simplicity**: Direct calculation without unnecessary complexity

The function does not perform rounding - if precise decimal control is needed, combine with rounding utilities.

## When To Use

Use `toPercentage` when you need:

- progress calculations (completed/total tasks)
- data visualization percentages
- statistical percentage calculations
- consistent percentage conversion with error handling

## When Not To Use

Avoid when:

- you need percentage with specific decimal places (use with rounding utilities)
- working with already calculated percentages
- base value can legitimately be zero (handle division by zero differently)
- you need percentage as a formatted string (use formatting utilities)

## Summary

`toPercentage` provides a simple, safe way to convert numeric values to percentages with proper error handling for division by zero cases.


## Snippets

### basic.ts

```ts
import { toPercentage } from "@petr-ptacek/js-core";

// basic percentage calculations
const score = toPercentage(85, 100);
console.log(`Score: ${score}%`); // Score: 85%

const completion = toPercentage(3, 4);
console.log(`Progress: ${completion}%`); // Progress: 75%

const ratio = toPercentage(1, 3);
console.log(`Ratio: ${ratio}%`); // Ratio: 33.333333333333336%

```

### progress-tracking.ts

```ts
import { toPercentage } from "@petr-ptacek/js-core";

// progress tracking example
class TaskProgress {
  private completed = 0;
  private total: number;

  constructor(totalTasks: number) {
    this.total = totalTasks;
  }

  completeTask() {
    if (this.completed < this.total) {
      this.completed++;
    }
  }

  getProgress(): number {
    if (this.total === 0) return 0;
    return toPercentage(this.completed, this.total);
  }

  getProgressString(): string {
    const percentage = this.getProgress();
    return `${this.completed}/${this.total} (${percentage.toFixed(1)}%)`;
  }
}

// usage
const project = new TaskProgress(10);

console.log(project.getProgressString()); // 0/10 (0.0%)

project.completeTask();
project.completeTask();
project.completeTask();

console.log(project.getProgressString()); // 3/10 (30.0%)

```

### statistics.ts

```ts
import { toPercentage } from "@petr-ptacek/js-core";

// statistical calculations
const surveyData = {
  totalResponses: 250,
  categories: {
    "Very Satisfied": 125,
    "Satisfied": 75,
    "Neutral": 30,
    "Dissatisfied": 15,
    "Very Dissatisfied": 5
  }
};

// calculate percentage for each category
const results = Object.entries(surveyData.categories).map(([category, count]) => ({
  category,
  count,
  percentage: toPercentage(count, surveyData.totalResponses)
}));

console.log("Survey Results:");
results.forEach(({ category, count, percentage }) => {
  console.log(`${category}: ${count} (${percentage.toFixed(1)}%)`);
});

// calculate satisfaction rate (Very Satisfied + Satisfied)
const satisfied = surveyData.categories["Very Satisfied"] + surveyData.categories["Satisfied"];
const satisfactionRate = toPercentage(satisfied, surveyData.totalResponses);

console.log(`\nOverall Satisfaction Rate: ${satisfactionRate}%`);

// example output:
// Survey Results:
// Very Satisfied: 125 (50.0%)
// Satisfied: 75 (30.0%)
// Neutral: 30 (12.0%)
// Dissatisfied: 15 (6.0%)
// Very Dissatisfied: 5 (2.0%)
//
// Overall Satisfaction Rate: 80%

```




