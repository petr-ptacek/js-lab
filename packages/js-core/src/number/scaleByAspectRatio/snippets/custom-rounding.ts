import { scaleByAspectRatio } from "@petr-ptacek/js-core";

// custom rounding examples
const dimensions = { width: 100, height: 75 };

// default rounding (Math.round)
const defaultRound = scaleByAspectRatio(dimensions, { width: 33 });
console.log("Default round:", defaultRound);
// { width: 33, height: 25 } (24.75 rounds to 25)

// floor rounding (always round down)
const floorRound = scaleByAspectRatio(dimensions, { width: 33 }, Math.floor);
console.log("Floor round:", floorRound);
// { width: 33, height: 24 } (24.75 floors to 24)

// ceil rounding (always round up)
const ceilRound = scaleByAspectRatio(dimensions, { width: 33 }, Math.ceil);
console.log("Ceil round:", ceilRound);
// { width: 33, height: 25 } (24.75 ceils to 25)

// custom rounding to even numbers
const roundToEven = (value: number) => {
  const rounded = Math.round(value);
  return rounded % 2 === 0 ? rounded : rounded + 1;
};

const evenRound = scaleByAspectRatio(dimensions, { width: 33 }, roundToEven);
console.log("Even round:", evenRound);
// { width: 33, height: 26 } (25 becomes 26 to be even)

// precision rounding (to specific decimal places)
const roundToDecimal = (decimals: number) => (value: number) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const precisionRound = scaleByAspectRatio(dimensions, { width: 33.33 }, roundToDecimal(1));
console.log("Precision round:", precisionRound);
// Rounds to 1 decimal place
