import { Emitter } from "@petr-ptacek/js-core";
import { describe, expect, it, vi } from "vitest";
import { createEmitter } from "../createEmitter";

type Events = {
  log: (msg: string) => void;
};

vi.mock("@petr-ptacek/js-core", () => {
  return {
    Emitter: vi.fn().mockImplementation(() => ({
      on: vi.fn(() => vi.fn()),
      once: vi.fn(() => vi.fn()),
      off: vi.fn(),
      emit: vi.fn(),
    })),
  };
});

describe("createEmitter", () => {
  it("registers cleanup when used inside component lifecycle", () => {
    const off = vi.fn();

    const MockedEmitter = vi.mocked(Emitter);

    MockedEmitter.mockImplementationOnce(() => ({
      on: vi.fn(() => vi.fn()),
      once: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    }));

    const e = createEmitter<Events>();

    e.on("log", vi.fn());

    expect(off).toBeTypeOf("function");
  });

  it("does not throw when used outside component lifecycle", () => {
    const MockedEmitter = vi.mocked(Emitter);

    MockedEmitter.mockImplementationOnce(() => ({
      on: vi.fn(() => vi.fn()),
      once: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    }));

    const e = createEmitter<Events>();

    expect(() => {
      e.on("log", vi.fn());
      e.emit("log", "test");
    }).not.toThrow();
  });

  it("returns cleanup function from on()", () => {
    const cleanup = vi.fn();
    const MockedEmitter = vi.mocked(Emitter);

    MockedEmitter.mockImplementationOnce(() => ({
      on: vi.fn(() => cleanup),
      once: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    }));

    const e = createEmitter<Events>();
    const off = e.on("log", vi.fn());

    off();

    expect(cleanup).toHaveBeenCalledOnce();
  });
});
