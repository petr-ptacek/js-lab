---
title: getRandomNumber
category: number
tags:
  - random
  - integer
  - range
  - generation
  - math
since: 1.0.0
---


> **Category:** number
> **Since:** 1.0.0
> **Tags:** random, integer, range, generation, math


# getRandomNumber

Returns a random integer within the given inclusive range.

## Usage

```ts
import { getRandomNumber } from "@petr-ptacek/js-core"

// random number between 1 and 6 (dice roll)
const dice = getRandomNumber(1, 6)
console.log(dice) // 1, 2, 3, 4, 5, or 6

// random number from 0 to 100
const percentage = getRandomNumber(0, 100)
console.log(percentage) // 0 to 100

// using defaults (0 to MAX_SAFE_INTEGER)
const largeRandom = getRandomNumber()
console.log(largeRandom) // 0 to 9007199254740991
```

## Why This Utility Exists

JavaScript's `Math.random()` returns floating-point values between 0 and 1, requiring manual conversion and range calculations for integer ranges. `getRandomNumber` provides a simple, consistent API for generating random integers within inclusive bounds with proper validation and edge case handling.

## Signature

```ts
function getRandomNumber(from?: number, to?: number): number
```

## Parameters

- `from` (`number`, optional): Lower bound (inclusive). Defaults to `0`.
- `to` (`number`, optional): Upper bound (inclusive). Defaults to `Number.MAX_SAFE_INTEGER`.

## Return Type

Returns a `number` representing a random integer within the specified range (inclusive of both bounds).

## Throws

- Throws `Error` when `from` is greater than `to`.

## Design Notes

The implementation uses the standard formula for converting `Math.random()` to an integer range:

```ts
Math.floor(Math.random() * (to - from + 1)) + from
```

Key design decisions:

1. **Inclusive bounds**: Both `from` and `to` are included in the possible results
2. **Input validation**: Ensures `from <= to` to prevent invalid ranges
3. **Default values**: Provides sensible defaults (0 and MAX_SAFE_INTEGER)
4. **Integer output**: Always returns whole numbers using `Math.floor()`

The formula adds 1 to the range calculation `(to - from + 1)` to make the upper bound inclusive.

## When To Use

Use `getRandomNumber` when you need:

- dice rolls or game mechanics
- random array indices
- test data generation with specific ranges
- random sampling from discrete sets
- simulation or statistical applications

## When Not To Use

Avoid when:

- you need floating-point random values (use `Math.random()` directly)
- you need cryptographically secure randomness (use `crypto.getRandomValues()`)
- you need reproducible randomness with seeds (use a seeded PRNG library)
- working with very large ranges that exceed safe integer limits

## Summary

`getRandomNumber` provides a simple, validated way to generate random integers within inclusive bounds, eliminating the need for manual range conversion and ensuring consistent behavior across different random number generation scenarios.


## Snippets

### basic.ts

```ts
import { getRandomNumber } from "@petr-ptacek/js-core";

// basic random number generation
const dice = getRandomNumber(1, 6);
console.log("Dice roll:", dice); // 1-6

const percentage = getRandomNumber(0, 100);
console.log("Percentage:", percentage); // 0-100

const coinFlip = getRandomNumber(0, 1);
console.log("Coin flip:", coinFlip ? "Heads" : "Tails"); // 0 or 1

// negative ranges
const temperature = getRandomNumber(-10, 35);
console.log("Temperature:", temperature, "°C"); // -10 to 35

// single value range
const constant = getRandomNumber(5, 5);
console.log("Always 5:", constant); // always 5

```

### gaming.ts

```ts
import { getRandomNumber } from "@petr-ptacek/js-core";

// gaming and simulation examples
class GameMechanics {
  // standard 6-sided dice
  rollDice(): number {
    return getRandomNumber(1, 6);
  }

  // roll multiple dice
  rollMultipleDice(count: number): number[] {
    return Array.from({ length: count }, () => this.rollDice());
  }

  // D20 system (common in RPGs)
  rollD20(): number {
    return getRandomNumber(1, 20);
  }

  // critical hit check (natural 20)
  isCriticalHit(): boolean {
    return this.rollD20() === 20;
  }

  // damage calculation with random component
  calculateDamage(baseDamage: number, randomRange: number): number {
    const randomBonus = getRandomNumber(0, randomRange);
    return baseDamage + randomBonus;
  }

  // random item rarity (weighted by rarity)
  getItemRarity(): string {
    const roll = getRandomNumber(1, 100);

    if (roll <= 60) return "Common";
    if (roll <= 85) return "Uncommon";
    if (roll <= 95) return "Rare";
    if (roll <= 99) return "Epic";
    return "Legendary";
  }

  // random spawn location in game world
  getRandomSpawnPoint(mapWidth: number, mapHeight: number) {
    return {
      x: getRandomNumber(0, mapWidth - 1),
      y: getRandomNumber(0, mapHeight - 1)
    };
  }
}

// usage examples
const game = new GameMechanics();

console.log("Dice roll:", game.rollDice());
console.log("Multiple dice:", game.rollMultipleDice(3));
console.log("D20 roll:", game.rollD20());
console.log("Critical hit:", game.isCriticalHit());
console.log("Damage:", game.calculateDamage(10, 5));
console.log("Item rarity:", game.getItemRarity());
console.log("Spawn point:", game.getRandomSpawnPoint(1000, 1000));

// simulate 100 item drops to see rarity distribution
const rarityCount = { Common: 0, Uncommon: 0, Rare: 0, Epic: 0, Legendary: 0 };
for (let i = 0; i < 100; i++) {
  const rarity = game.getItemRarity();
  rarityCount[rarity as keyof typeof rarityCount]++;
}
console.log("Rarity distribution (100 drops):", rarityCount);

```

### test-data.ts

```ts
import { getRandomNumber } from "@petr-ptacek/js-core";

// test data generation utilities
class TestDataGenerator {
  // generate random user age
  generateAge(): number {
    return getRandomNumber(18, 80);
  }

  // generate random score
  generateScore(): number {
    return getRandomNumber(0, 100);
  }

  // generate random quantity
  generateQuantity(): number {
    return getRandomNumber(1, 50);
  }

  // generate random delay for testing
  generateDelay(): number {
    return getRandomNumber(100, 2000); // 100ms to 2s
  }

  // generate random array index
  generateArrayIndex(arrayLength: number): number {
    return getRandomNumber(0, arrayLength - 1);
  }

  // generate random user data
  generateUser() {
    const firstNames = ["Alice", "Bob", "Carol", "David", "Eve"];
    const lastNames = ["Smith", "Johnson", "Brown", "Davis", "Wilson"];

    return {
      id: getRandomNumber(1000, 9999),
      firstName: firstNames[this.generateArrayIndex(firstNames.length)],
      lastName: lastNames[this.generateArrayIndex(lastNames.length)],
      age: this.generateAge(),
      score: this.generateScore()
    };
  }

  // generate random purchase data
  generatePurchase() {
    const products = ["Laptop", "Phone", "Tablet", "Headphones", "Mouse"];

    return {
      orderId: getRandomNumber(10000, 99999),
      product: products[this.generateArrayIndex(products.length)],
      quantity: this.generateQuantity(),
      price: getRandomNumber(10, 1500), // $10 to $1500
      timestamp: Date.now() - getRandomNumber(0, 30 * 24 * 60 * 60 * 1000) // last 30 days
    };
  }

  // generate bulk test data
  generateUsers(count: number) {
    return Array.from({ length: count }, () => this.generateUser());
  }

  generatePurchases(count: number) {
    return Array.from({ length: count }, () => this.generatePurchase());
  }
}

// usage examples
const generator = new TestDataGenerator();

console.log("Random user:", generator.generateUser());
console.log("Random purchase:", generator.generatePurchase());

// generate test datasets
const testUsers = generator.generateUsers(5);
console.log("Test users:", testUsers);

const testPurchases = generator.generatePurchases(3);
console.log("Test purchases:", testPurchases);

// simulate API response times
async function simulateApiCall(endpoint: string) {
  const delay = generator.generateDelay();
  console.log(`Calling ${endpoint}... (${delay}ms delay)`);

  await new Promise(resolve => setTimeout(resolve, delay));

  // simulate success/error (90% success rate)
  const success = getRandomNumber(1, 100) <= 90;
  return {
    success,
    data: success ? { result: "Data loaded" } : null,
    error: success ? null : "Network error",
    responseTime: delay
  };
}

// example usage
simulateApiCall("/api/users").then(result => {
  console.log("API result:", result);
});

```




