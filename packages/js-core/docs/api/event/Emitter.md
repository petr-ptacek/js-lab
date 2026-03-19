---
title: Emitter
category: event
tags:
  - event
  - emitter
  - typed
  - observer
  - pubsub
  - handler
since: 1.0.0
---


> **Category:** event
> **Since:** 1.0.0
> **Tags:** event, emitter, typed, observer, pubsub, handler


# Emitter

Strongly-typed event emitter with type-safe event definitions and handler management.

## Usage

```ts
import { Emitter } from "@petr-ptacek/js-core"

type Events = {
  userLogin: (user: { id: string; name: string }) => void;
  dataReceived: (data: unknown[]) => void;
  error: (message: string) => void;
}

const emitter = new Emitter<Events>()

// Register handlers
const cleanup = emitter.on("userLogin", (user) => {
  console.log(`Welcome ${user.name}!`)
})

// Emit events
emitter.emit("userLogin", { id: "123", name: "John" })

// Cleanup
cleanup()
```

## Why This Utility Exists

JavaScript lacks a built-in type-safe event emitter. Existing solutions like Node.js EventEmitter are untyped, leading
to runtime errors and poor developer experience. This utility provides compile-time type checking for event names and
payloads, ensuring type safety across event-driven architectures.

## Signature

```ts
class Emitter<Events extends EmitterEvents> {
  constructor()
  constructor(initialHandlers: EmitterInitialHandlers<Events>)

  on<TType extends keyof Events>(type: TType, handler: Events[TType]): CleanupFn

  once<TType extends keyof Events>(type: TType, handler: Events[TType]): CleanupFn

  emit<TType extends keyof Events>(type: TType, ...args: Parameters<Events[TType]>): void

  off<TType extends keyof Events>(type: TType): void
  off<TType extends keyof Events>(type: TType, handler: Events[TType]): void

  clear(): void
}
```

## Parameters

### Constructor Parameters

- `initialHandlers` (`EmitterInitialHandlers<Events>`, optional): Object defining initial event handlers. Handlers can be provided directly or with metadata like `once`.

### Method Parameters

- `on(type, handler)`: Registers an event handler
  - `type` (`keyof Events`): Event name
  - `handler` (`Events[TType]`): Handler function matching the event signature
- `once(type, handler)`: Registers a one-time event handler with same parameters as `on`
- `emit(type, ...args)`: Emits an event
  - `type` (`keyof Events`): Event name
  - `args` (`Parameters<Events[TType]>`): Arguments matching the handler signature
- `off(type, handler?)`: Removes event handlers
  - `type` (`keyof Events`): Event name
  - `handler` (`Events[TType]`, optional): Specific handler to remove; omit to remove all handlers for the event

## Type Parameters

- `<Events extends EmitterEvents>`: Object type defining the event map where keys are event names and values are handler
  function signatures.

## Return Type

- Constructor returns an `Emitter<Events>` instance
- `on()` and `once()` return a cleanup function of type `CleanupFn`
- `emit()`, `off()`, and `clear()` return `void`

## Type Declarations

The utility exports several TypeScript types for proper integration:

```ts
type EmitterEvents = {
  [event: string | symbol]: (...args: any[]) => void;
}

type EmitterInitialHandlers<E extends EmitterEvents> = {
  [K in keyof E]?: InitialHandler<E[K]>;
}

type InitialHandler<THandler> = THandler | {
  handler: THandler;
  once?: boolean;
}

type EmitterEventHandler = (...args: any[]) => void;

type CleanupFn = () => void;
```

These types enable proper TypeScript integration and ensure type safety when defining event maps and handlers.

## Design Notes

The implementation uses a Map-based storage system for efficient handler management. Handlers are executed in the order
they were registered, providing predictable behavior.

The generic `Events` type constrains event definitions to function signatures, enabling automatic parameter inference
and type checking. The class maintains strict type boundaries between different event types.

One-time handlers are automatically removed after execution, eliminating memory leaks. The cleanup functions returned by
`on()` and `once()` provide explicit handler removal control.

## When To Use

Use `Emitter` when you need:

- type-safe event-driven communication between components
- decoupled architecture with event-based messaging
- automatic cleanup of event handlers
- compile-time validation of event names and payloads

## When Not To Use

Avoid when:

- working with DOM events (use native EventTarget instead)
- you need async event handling patterns
- simple callback patterns are sufficient
- working with external event systems that don't support custom emitters

## Summary

`Emitter` provides a type-safe event emitter with automatic handler cleanup, compile-time event validation, and
predictable execution order for building robust event-driven applications.


## Snippets

### basic.ts

```ts
import { Emitter } from "@petr-ptacek/js-core";

// Define event types
type AppEvents = {
  userLogin: (user: { id: string; name: string; email: string }) => void;
  userLogout: (userId: string) => void;
  dataReceived: (data: unknown[], timestamp: number) => void;
  error: (message: string, code?: number) => void;
}

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
  console.log(`📦 Received ${data.length} items at ${new Date(timestamp).toISOString()}`);
});

const errorCleanup = emitter.on("error", (message, code) => {
  console.error(`❌ Error ${code ? `[${code}]` : ''}: ${message}`);
});

// Emit events
emitter.emit("userLogin", {
  id: "user123",
  name: "Alice Johnson",
  email: "alice@example.com"
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
emitter.emit("userLogin", { id: "user456", name: "Bob", email: "bob@example.com" });
console.log("No output above means handlers were properly removed");

```

### initial-handlers.ts

```ts
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

```

### real-world-usage.ts

```ts
import { Emitter } from "@petr-ptacek/js-core";

// Real-world application event system
type AppEvents = {
  // User authentication events
  authStateChanged: (user: { id: string; name: string } | null) => void;

  // Data loading events
  loadingStart: (resource: string) => void;
  loadingComplete: (resource: string, data: unknown) => void;
  loadingError: (resource: string, error: Error) => void;

  // UI events
  modalOpen: (modalId: string) => void;
  modalClose: (modalId: string) => void;

  // System events
  connectionLost: () => void;
  connectionRestored: () => void;
}

console.log("=== Application Event System ===");

// Create application-wide event bus
const appEventBus = new Emitter<AppEvents>();

// Authentication service
class AuthService {
  private currentUser: { id: string; name: string } | null = null;
  private eventBus: Emitter<AppEvents>;

  constructor(eventBus: Emitter<AppEvents>) {
    this.eventBus = eventBus;
    // Listen for connection events to handle auth state
    this.eventBus.on("connectionRestored", () => {
      this.refreshAuthState();
    });
  }

  login(username: string) {
    console.log(`🔐 Logging in user: ${username}`);
    this.currentUser = { id: `user_${Date.now()}`, name: username };
    this.eventBus.emit("authStateChanged", this.currentUser);
  }

  logout() {
    console.log("🔓 Logging out user");
    this.currentUser = null;
    this.eventBus.emit("authStateChanged", null);
  }

  private refreshAuthState() {
    console.log("🔄 Refreshing auth state...");
    // In real app, would check with server
    this.eventBus.emit("authStateChanged", this.currentUser);
  }
}

// Data loading service
class DataService {
  private eventBus: Emitter<AppEvents>;

  constructor(eventBus: Emitter<AppEvents>) {
    this.eventBus = eventBus;
  }

  async loadUserProfile(userId: string) {
    const resource = `user-profile-${userId}`;

    try {
      this.eventBus.emit("loadingStart", resource);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const profileData = {
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        preferences: { theme: "dark" }
      };

      this.eventBus.emit("loadingComplete", resource, profileData);
      return profileData;

    } catch (error) {
      this.eventBus.emit("loadingError", resource, error as Error);
      throw error;
    }
  }
}

// UI Manager
class UIManager {
  private openModals = new Set<string>();
  private eventBus: Emitter<AppEvents>;

  constructor(eventBus: Emitter<AppEvents>) {
    this.eventBus = eventBus;
    // Clean up modals on auth changes
    this.eventBus.on("authStateChanged", (user) => {
      if (!user) {
        this.closeAllModals();
      }
    });

    // Handle connection issues
    this.eventBus.on("connectionLost", () => {
      this.showModal("connection-error");
    });

    this.eventBus.on("connectionRestored", () => {
      this.hideModal("connection-error");
    });
  }

  showModal(modalId: string) {
    console.log(`📱 Opening modal: ${modalId}`);
    this.openModals.add(modalId);
    this.eventBus.emit("modalOpen", modalId);
  }

  hideModal(modalId: string) {
    console.log(`📱 Closing modal: ${modalId}`);
    this.openModals.delete(modalId);
    this.eventBus.emit("modalClose", modalId);
  }

  private closeAllModals() {
    console.log("📱 Closing all modals due to auth change");
    for (const modalId of this.openModals) {
      this.hideModal(modalId);
    }
  }
}

// Analytics service
class AnalyticsService {
  private eventBus: Emitter<AppEvents>;

  constructor(eventBus: Emitter<AppEvents>) {
    this.eventBus = eventBus;
    // Track user interactions
    this.eventBus.on("authStateChanged", (user) => {
      this.track(user ? "user_login" : "user_logout", { userId: user?.id });
    });

    this.eventBus.on("modalOpen", (modalId) => {
      this.track("modal_opened", { modalId });
    });

    this.eventBus.on("loadingError", (resource, error) => {
      this.track("loading_error", { resource, errorMessage: error.message });
    });
  }

  private track(event: string, data?: Record<string, unknown>) {
    console.log(`📊 Analytics: ${event}`, data || {});
  }
}

// Initialize services
const authService = new AuthService(appEventBus);
const dataService = new DataService(appEventBus);
const uiManager = new UIManager(appEventBus);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const _analyticsService = new AnalyticsService(appEventBus);

// Application flow simulation
async function simulateAppUsage() {
  console.log("\n=== Simulating Application Usage ===");

  // User login
  authService.login("alice_user");

  // Show loading UI
  uiManager.showModal("loading-spinner");

  // Load user data
  try {
    const profile = await dataService.loadUserProfile("user123");
    console.log("✅ Profile loaded:", profile.name);
    uiManager.hideModal("loading-spinner");
  } catch (_error) {
    console.error("❌ Failed to load profile");
  }

  // Simulate connection issues
  console.log("\n=== Connection Issues ===");
  appEventBus.emit("connectionLost");

  await new Promise(resolve => setTimeout(resolve, 500));

  appEventBus.emit("connectionRestored");

  // User logout
  console.log("\n=== User Logout ===");
  authService.logout();
}

// Run simulation
simulateAppUsage();

```




