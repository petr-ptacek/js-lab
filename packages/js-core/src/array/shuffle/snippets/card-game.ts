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
