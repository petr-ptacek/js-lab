import { Emitter } from "@petr-ptacek/js-core";

// Define game events
type GameEvents = {
  gameStart: () => void;
  playerJoin: (player: { id: string; name: string }) => void;
  playerLeave: (playerId: string) => void;
  scoreUpdate: (playerId: string, score: number) => void;
  gameEnd: (winner: { id: string; name: string; score: number }) => void;
}

console.log("=== Initial Handlers Example ===");

// Create emitter with initial handlers
const gameEmitter = new Emitter<GameEvents>({
  // Simple handler
  gameStart: () => {
    console.log("🎮 Game started!");
  },

  // Handler with once option
  gameEnd: {
    handler: (winner) => {
      console.log(`🏆 Game ended! Winner: ${winner.name} with ${winner.score} points`);
    },
    once: true  // This handler will only run once
  },

  // Multiple initial handlers for the same event type
  playerJoin: (player) => {
    console.log(`👤 ${player.name} joined the game`);
  }
});

// Add more handlers after construction
gameEmitter.on("playerJoin", (player) => {
  console.log(`📊 Player count updated (${player.name} added)`);
});

gameEmitter.on("playerLeave", (playerId) => {
  console.log(`👋 Player ${playerId} left the game`);
});

gameEmitter.on("scoreUpdate", (playerId, score) => {
  console.log(`📈 Player ${playerId} scored! New score: ${score}`);
});

// Simulate game flow
console.log("\n=== Game Simulation ===");

gameEmitter.emit("gameStart");

gameEmitter.emit("playerJoin", { id: "p1", name: "Alice" });
gameEmitter.emit("playerJoin", { id: "p2", name: "Bob" });

gameEmitter.emit("scoreUpdate", "p1", 100);
gameEmitter.emit("scoreUpdate", "p2", 150);
gameEmitter.emit("scoreUpdate", "p1", 200);

gameEmitter.emit("playerLeave", "p2");

gameEmitter.emit("gameEnd", { id: "p1", name: "Alice", score: 200 });

// Try to emit gameEnd again - the once handler won't run
console.log("\n=== Testing Once Handler ===");
gameEmitter.emit("gameEnd", { id: "p1", name: "Alice", score: 200 });
console.log("Notice: gameEnd handler didn't run the second time (once: true)");

// Remove all handlers for a specific event
console.log("\n=== Removing All Handlers ===");
gameEmitter.off("playerJoin");
gameEmitter.emit("playerJoin", { id: "p3", name: "Charlie" });
console.log("No playerJoin output above - all handlers were removed");

// Clear all remaining handlers
gameEmitter.clear();
console.log("All handlers cleared from emitter");
