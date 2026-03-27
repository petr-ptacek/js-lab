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
};

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const profileData = {
        id: userId,
        name: "John Doe",
        email: "john@example.com",
        preferences: { theme: "dark" },
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

  await new Promise((resolve) => setTimeout(resolve, 500));

  appEventBus.emit("connectionRestored");

  // User logout
  console.log("\n=== User Logout ===");
  authService.logout();
}

// Run simulation
simulateAppUsage();
