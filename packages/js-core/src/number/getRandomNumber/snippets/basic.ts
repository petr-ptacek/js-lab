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
