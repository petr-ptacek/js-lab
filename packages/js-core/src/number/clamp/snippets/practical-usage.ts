import { clamp } from "@petr-ptacek/js-core";

// User input validation
function processUserInput(userValue: string) {
  const numericValue = parseFloat(userValue);

  // Clamp to valid percentage range
  const percentage = clamp(numericValue, 0, 100);
  console.log(`User input "${userValue}" -> ${percentage}%`);

  return percentage;
}

console.log("=== User Input Validation ===");
processUserInput("50"); // 50%
processUserInput("150"); // 100%
processUserInput("-20"); // 0%

// Slider/Progress bar implementation
class Slider {
  private _value: number = 0;
  private min: number;
  private max: number;

  constructor(min: number = 0, max: number = 100) {
    this.min = min;
    this.max = max;
  }

  setValue(value: number): void {
    this._value = clamp(value, this.min, this.max);
  }

  getValue(): number {
    return this._value;
  }

  getPercentage(): number {
    const range = this.max - this.min;
    return ((this._value - this.min) / range) * 100;
  }
}

console.log("\n=== Slider Control ===");
const slider = new Slider(0, 255); // RGB color slider

slider.setValue(128);
console.log(
  `Value: ${slider.getValue()}, Percentage: ${slider.getPercentage().toFixed(1)}%`,
);

slider.setValue(300); // Clamped to 255
console.log(
  `Value: ${slider.getValue()}, Percentage: ${slider.getPercentage().toFixed(1)}%`,
);

slider.setValue(-50); // Clamped to 0
console.log(
  `Value: ${slider.getValue()}, Percentage: ${slider.getPercentage().toFixed(1)}%`,
);

// Game physics - velocity limiting
function updatePlayerVelocity(currentVelocity: number, acceleration: number) {
  const MAX_SPEED = 10;
  const MIN_SPEED = -10;

  const newVelocity = currentVelocity + acceleration;
  return clamp(newVelocity, MIN_SPEED, MAX_SPEED);
}

console.log("\n=== Game Physics ===");
let velocity = 0;

velocity = updatePlayerVelocity(velocity, 5); // 5
velocity = updatePlayerVelocity(velocity, 8); // 10 (clamped)
velocity = updatePlayerVelocity(velocity, -25); // -10 (clamped)

console.log(`Final velocity: ${velocity}`);
