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
