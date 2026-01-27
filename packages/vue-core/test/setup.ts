import { vi, beforeEach, afterEach } from "vitest";

// ---- Fake timers (watchDebounced, setTimeout) ----
beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

// ---- ResizeObserver mock (required by @vueuse/core) ----
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
