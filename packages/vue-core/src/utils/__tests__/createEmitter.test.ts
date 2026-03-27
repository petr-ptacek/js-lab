import { Emitter } from "@petr-ptacek/js-core";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getCurrentInstance, onBeforeUnmount } from "vue";
import { createEmitter } from "../createEmitter";

type Events = {
  log: (msg: string) => void;
};

vi.mock("@petr-ptacek/js-core", () => {
  return {
    Emitter: vi.fn(function MockEmitter() {
      return {
        on: vi.fn(() => vi.fn()),
        once: vi.fn(() => vi.fn()),
        off: vi.fn(),
        emit: vi.fn(),
      };
    }),
  };
});

vi.mock("vue", () => {
  return {
    getCurrentInstance: vi.fn(() => null),
    onBeforeUnmount: vi.fn(),
  };
});

describe("createEmitter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getCurrentInstance).mockReturnValue(null);
  });

  it("registers cleanup when used inside component lifecycle", () => {
    const cleanup = vi.fn();
    const on = vi.fn(() => cleanup);
    let unmountCleanup: (() => void) | undefined;

    const MockedEmitter = vi.mocked(Emitter);

    MockedEmitter.mockImplementationOnce(function MockEmitter() {
      return {
        on,
        once: vi.fn(() => vi.fn()),
        off: vi.fn(),
        emit: vi.fn(),
      };
    });

    vi.mocked(getCurrentInstance).mockReturnValue({} as never);
    vi.mocked(onBeforeUnmount).mockImplementation((fn: () => void) => {
      unmountCleanup = fn;
    });

    const e = createEmitter<Events>();
    const handler = vi.fn();

    const off = e.on("log", handler);

    expect(on).toHaveBeenCalledWith("log", handler);
    expect(onBeforeUnmount).toHaveBeenCalledOnce();
    expect(off).toBe(cleanup);

    unmountCleanup?.();

    expect(cleanup).toHaveBeenCalledOnce();
  });

  it("does not register lifecycle cleanup outside component lifecycle", () => {
    const on = vi.fn(() => vi.fn());
    const emit = vi.fn();
    const MockedEmitter = vi.mocked(Emitter);

    MockedEmitter.mockImplementationOnce(function MockEmitter() {
      return {
        on,
        once: vi.fn(() => vi.fn()),
        off: vi.fn(),
        emit,
      };
    });

    const e = createEmitter<Events>();
    const handler = vi.fn();

    expect(() => {
      e.on("log", handler);
      e.emit("log", "test");
    }).not.toThrow();

    expect(on).toHaveBeenCalledWith("log", handler);
    expect(emit).toHaveBeenCalledWith("log", "test");
    expect(onBeforeUnmount).not.toHaveBeenCalled();
  });

  it("returns cleanup function from on()", () => {
    const cleanup = vi.fn();
    const on = vi.fn(() => cleanup);
    const MockedEmitter = vi.mocked(Emitter);

    MockedEmitter.mockImplementationOnce(function MockEmitter() {
      return {
        on,
        once: vi.fn(() => vi.fn()),
        off: vi.fn(),
        emit: vi.fn(),
      };
    });

    const e = createEmitter<Events>();
    const handler = vi.fn();
    const off = e.on("log", handler);

    off();

    expect(on).toHaveBeenCalledWith("log", handler);
    expect(cleanup).toHaveBeenCalledOnce();
  });
});
