---
title: shuffle
category: array
tags:
  - array
  - shuffle
  - random
  - fisher-yates
  - immutable
  - randomize
since: 1.0.0
---


> **Category:** array
> **Since:** 1.0.0
> **Tags:** array, shuffle, random, fisher-yates, immutable, randomize


# shuffle

Returns a new array with elements shuffled in random order using the Fisher–Yates shuffle algorithm.

## Usage

```ts
import { shuffle } from "@petr-ptacek/js-core"

const numbers = [1, 2, 3, 4, 5];
const shuffled = shuffle(numbers);

console.log(shuffled); // [3, 1, 5, 2, 4] (random order)
```

## Why This Utility Exists

JavaScript doesn't provide a built-in shuffle method, and common approaches like `array.sort(() => Math.random() - 0.5)` are mathematically incorrect and produce biased results. This utility implements the Fisher–Yates shuffle algorithm which guarantees uniform distribution where each permutation has equal probability.

## Signature

```ts
function shuffle<T>(array: readonly T[]): T[]
```

## Parameters

- `array` (`readonly T[]`): The array to shuffle.

## Type Parameters

- `<T>`: The type of elements in the array.

## Return Type

Returns a new array containing all elements from the input array in randomized order. The original array is not modified.

## Design Notes

The implementation uses the modern Fisher–Yates shuffle algorithm:
- Creates a copy of the input array to maintain immutability
- Iterates from the last element backward
- For each position, selects a random element from the remaining unshuffled portion
- Swaps the current element with the randomly selected one


## When To Use

Use `shuffle` when you need:

- random ordering of array elements
- mathematically correct uniform distribution
- immutable shuffling without modifying the original array
- type-safe randomization with TypeScript

## When Not To Use

Avoid when:

- cryptographically secure randomness is required (uses `Math.random()`)
- you need to shuffle in-place to save memory
- deterministic "random" ordering with seeds is needed
- working with extremely large arrays where memory is constrained

## Summary

`shuffle` provides a mathematically correct way to randomize array elements using the Fisher–Yates algorithm while preserving immutability and type safety.


## Snippets

### basic.ts

```ts
import { shuffle } from "@petr-ptacek/js-core";

// Basic array shuffling
const numbers = [1, 2, 3, 4, 5];
const shuffledNumbers = shuffle(numbers);

console.log("Original:", numbers);        // [1, 2, 3, 4, 5]
console.log("Shuffled:", shuffledNumbers); // e.g., [3, 1, 5, 2, 4]

// String array
const words = ["hello", "world", "foo", "bar"];
const shuffledWords = shuffle(words);

console.log("Original words:", words);         // ["hello", "world", "foo", "bar"]
console.log("Shuffled words:", shuffledWords); // e.g., ["bar", "hello", "foo", "world"]

// Object array
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const shuffledUsers = shuffle(users);
console.log("Shuffled users:", shuffledUsers);
// e.g., [{ id: 3, name: "Charlie" }, { id: 1, name: "Alice" }, { id: 2, name: "Bob" }]

```

### card-game.ts

```ts
import { shuffle } from "@petr-ptacek/js-core";

// Card deck simulation
const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Create full deck
const deck = suits.flatMap(suit =>
  ranks.map(rank => `${rank}${suit}`)
);

console.log("Original deck (first 5):", deck.slice(0, 5));
// ["A♠", "2♠", "3♠", "4♠", "5♠"]

// Shuffle the deck
const shuffledDeck = shuffle(deck);
console.log("Shuffled deck (first 5):", shuffledDeck.slice(0, 5));
// e.g., ["7♥", "K♠", "3♦", "A♣", "9♠"]

// Deal hands
const player1Hand = shuffledDeck.slice(0, 5);
const player2Hand = shuffledDeck.slice(5, 10);
const player3Hand = shuffledDeck.slice(10, 15);

console.log("Player 1 hand:", player1Hand);
console.log("Player 2 hand:", player2Hand);
console.log("Player 3 hand:", player3Hand);

```

### quiz-playlist.ts

```ts
import { shuffle } from "@petr-ptacek/js-core";

// Quiz questions randomization
const questions = [
  { question: "What is the capital of France?", answer: "Paris", difficulty: "easy" },
  { question: "What is 2 + 2?", answer: "4", difficulty: "easy" },
  { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare", difficulty: "medium" },
  { question: "What is the square root of 144?", answer: "12", difficulty: "medium" },
  { question: "What is the atomic number of gold?", answer: "79", difficulty: "hard" }
];

// Randomize quiz order
const randomizedQuiz = shuffle(questions);
console.log("Randomized quiz questions:");
randomizedQuiz.forEach((q, index) => {
  console.log(`${index + 1}. [${q.difficulty.toUpperCase()}] ${q.question}`);
});

// Music playlist shuffling
const playlist = [
  { title: "Bohemian Rhapsody", artist: "Queen", duration: 355 },
  { title: "Hotel California", artist: "Eagles", duration: 391 },
  { title: "Stairway to Heaven", artist: "Led Zeppelin", duration: 482 },
  { title: "Imagine", artist: "John Lennon", duration: 183 },
  { title: "Billie Jean", artist: "Michael Jackson", duration: 294 }
];

// Shuffle playlist
const shuffledPlaylist = shuffle(playlist);
console.log("\nShuffled playlist:");
shuffledPlaylist.forEach((song, index) => {
  const minutes = Math.floor(song.duration / 60);
  const seconds = song.duration % 60;
  console.log(`${index + 1}. ${song.title} - ${song.artist} (${minutes}:${seconds.toString().padStart(2, '0')})`);
});

```




