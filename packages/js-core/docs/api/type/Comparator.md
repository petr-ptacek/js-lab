---
title: Comparator
category: type
tags:
  - type
  - function
  - comparator
  - sorting
  - ordering
  - comparison
since: 1.0.0
---


> **Category:** type
> **Since:** 1.0.0
> **Tags:** type, function, comparator, sorting, ordering, comparison


# Comparator

Represents a comparison function.

## Usage

```ts
import type { Comparator } from "@petr-ptacek/js-core"

// Basic comparators
const compareNumbers: Comparator<number> = (a, b) => a - b
const compareStrings: Comparator<string> = (a, b) => a.localeCompare(b)

// Object comparisons
interface User {
  name: string
  age: number
}

const compareByAge: Comparator<User> = (a, b) => a.age - b.age
const compareByName: Comparator<User> = (a, b) => a.name.localeCompare(b.name)

// Reverse comparator
const reverseNumber: Comparator<number> = (a, b) => b - a

// Usage with sorting
const numbers = [3, 1, 4, 1, 5, 9]
numbers.sort(compareNumbers) // [1, 1, 3, 4, 5, 9]

const users: User[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 }
]

users.sort(compareByAge) // Sorted by age: Bob(25), Alice(30), Charlie(35)
users.sort(compareByName) // Sorted by name: Alice, Bob, Charlie
```

## Why This Type Exists

Sorting and ordering operations require consistent comparison logic that follows JavaScript's sort convention. `Comparator<T>` provides a standardized type for comparison functions that return numeric values, ensuring compatibility with `Array.sort()` and other ordering utilities while maintaining type safety for the compared values.

## Type Declaration

```ts
type Comparator<T> = (a: T, b: T) => number
```

## Type Parameters

- `<T>`: The type of values being compared.

## When To Use

Use `Comparator<T>` when:

- implementing custom sorting logic for complex objects
- building utilities that need configurable ordering
- creating reusable comparison functions
- working with priority queues, binary search, or other ordered data structures
- providing sort options in APIs

```ts
// Multi-level sorting
function createMultiComparator<T>(...comparators: Comparator<T>[]): Comparator<T> {
  return (a, b) => {
    for (const compare of comparators) {
      const result = compare(a, b)
      if (result !== 0) return result
    }
    return 0
  }
}

// Sort by age first, then by name
const multiSort = createMultiComparator<User>(compareByAge, compareByName)
users.sort(multiSort)

// Utility functions
function sortBy<T, K>(array: T[], selector: (item: T) => K, comparator: Comparator<K>): T[] {
  return [...array].sort((a, b) => comparator(selector(a), selector(b)))
}

function binarySearch<T>(array: T[], target: T, comparator: Comparator<T>): number {
  let left = 0
  let right = array.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const comparison = comparator(array[mid], target)
    
    if (comparison === 0) return mid
    if (comparison < 0) left = mid + 1
    else right = mid - 1
  }
  
  return -1
}

// Date comparisons
const compareDates: Comparator<Date> = (a, b) => a.getTime() - b.getTime()

// Case-insensitive string comparison
const compareCaseInsensitive: Comparator<string> = (a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
```

## When Not To Use

Avoid when:

- you need boolean equality checks (use `===` or custom equality functions)
- working with non-orderable data that doesn't have meaningful comparison
- simple ascending number/string sorts (use default sort or basic subtraction)
- you need complex multi-criteria sorting (consider dedicated sorting libraries)

## Design Notes

Comparator functions follow the standard JavaScript sorting convention:

1. **Negative result**: First argument is "less than" second argument
2. **Zero result**: Arguments are considered equal for sorting purposes  
3. **Positive result**: First argument is "greater than" second argument

This convention ensures compatibility with `Array.sort()` and other JavaScript sorting APIs.

## Summary

`Comparator<T>` provides a standardized type for comparison functions that return numeric ordering results, enabling type-safe custom sorting logic and compatibility with JavaScript's built-in sorting mechanisms.





