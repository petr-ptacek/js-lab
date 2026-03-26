import { Emitter } from "@petr-ptacek/js-core";

// Define event types
type AppEvents = {
  userLogin: (user: { id: string; name: string; email: string }) => void;
  userLogout: (userId: string) => void;
  dataReceived: (data: unknown[], timestamp: number) => void;
  error: (message: string, code?: number) => void;
};

console.log("=== Basic Event Emitter Usage ===");

// Create emitter instance
const emitter = new Emitter<AppEvents>();

// Register event handlers
const loginCleanup = emitter.on("userLogin", (user) => {
  console.log(`✅ User logged in: ${user.name} (${user.email})`);
});

const logoutCleanup = emitter.on("userLogout", (userId) => {
  console.log(`👋 User ${userId} logged out`);
});

const dataCleanup = emitter.on("dataReceived", (data, timestamp) => {
  console.log(
    `📦 Received ${data.length} items at ${new Date(timestamp).toISOString()}`,
  );
});

const errorCleanup = emitter.on("error", (message, code) => {
  console.error(`❌ Error ${code ? `[${code}]` : ""}: ${message}`);
});

// Emit events
emitter.emit("userLogin", {
  id: "user123",
  name: "Alice Johnson",
  email: "alice@example.com",
});

emitter.emit("dataReceived", [{ id: 1 }, { id: 2 }, { id: 3 }], Date.now());

emitter.emit("error", "Connection failed", 500);

emitter.emit("userLogout", "user123");

// One-time handlers
console.log("\n=== One-time Handlers ===");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const _onceCleanup = emitter.once("error", (message) => {
  console.log(`🔥 This error handler will only run once: ${message}`);
});

emitter.emit("error", "First error"); // Handler runs
emitter.emit("error", "Second error"); // Handler already removed

// Cleanup handlers
console.log("\n=== Cleanup ===");
loginCleanup();
logoutCleanup();
dataCleanup();
errorCleanup();

console.log("All handlers cleaned up");

// Verify cleanup worked
emitter.emit("userLogin", {
  id: "user456",
  name: "Bob",
  email: "bob@example.com",
});
console.log("No output above means handlers were properly removed");
