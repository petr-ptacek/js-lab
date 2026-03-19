import { describe, it, expect, vi } from "vitest";
import { Emitter } from "../Emitter";

type Events = {
  sum: (a: number, b: number) => number;
  log: (msg: string) => void;
};

describe("Emitter", () => {
  it("registers handlers via constructor (function form)", () => {
    const sum = vi.fn((a: number, b: number) => a + b);

    const emitter = new Emitter<Events>({
      sum,
    });

    emitter.emit("sum", 1, 2);

    expect(sum).toHaveBeenCalledOnce();
    expect(sum).toHaveBeenCalledWith(1, 2);
  });

  it("registers handlers via constructor (object form)", () => {
    const log = vi.fn();

    const emitter = new Emitter<Events>({
      log: {
        handler: log,
      },
    });

    emitter.emit("log", "hello");

    expect(log).toHaveBeenCalledOnce();
    expect(log).toHaveBeenCalledWith("hello");
  });

  it("supports once handlers via constructor", () => {
    const log = vi.fn();

    const emitter = new Emitter<Events>({
      log: {
        handler: log,
        once: true,
      },
    });

    emitter.emit("log", "a");
    emitter.emit("log", "b");

    expect(log).toHaveBeenCalledOnce();
    expect(log).toHaveBeenCalledWith("a");
  });

  it("registers handlers using on()", () => {
    const fn = vi.fn();

    const emitter = new Emitter<Events>();
    emitter.on("log", fn);

    emitter.emit("log", "test");

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("test");
  });

  it("registers handlers using once()", () => {
    const fn = vi.fn();

    const emitter = new Emitter<Events>();
    emitter.once("log", fn);

    emitter.emit("log", "a");
    emitter.emit("log", "b");

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("returns cleanup function from on()", () => {
    const fn = vi.fn();

    const emitter = new Emitter<Events>();
    const off = emitter.on("log", fn);

    off();
    emitter.emit("log", "test");

    expect(fn).not.toHaveBeenCalled();
  });

  it("does not register the same handler twice", () => {
    const fn = vi.fn();

    const emitter = new Emitter<Events>();
    emitter.on("log", fn);
    emitter.on("log", fn);

    emitter.emit("log", "test");

    expect(fn).toHaveBeenCalledOnce();
  });

  it("off(type, handler) removes only the given handler", () => {
    const a = vi.fn();
    const b = vi.fn();

    const emitter = new Emitter<Events>();
    emitter.on("log", a);
    emitter.on("log", b);

    emitter.off("log", a);
    emitter.emit("log", "test");

    expect(a).not.toHaveBeenCalled();
    expect(b).toHaveBeenCalledOnce();
  });

  it("off(type) removes all handlers for the event", () => {
    const a = vi.fn();
    const b = vi.fn();

    const emitter = new Emitter<Events>();
    emitter.on("log", a);
    emitter.on("log", b);

    emitter.off("log");
    emitter.emit("log", "test");

    expect(a).not.toHaveBeenCalled();
    expect(b).not.toHaveBeenCalled();
  });

  it("clear() removes all handlers", () => {
    const sum = vi.fn();
    const log = vi.fn();

    const emitter = new Emitter<Events>({
      sum,
      log,
    });

    emitter.clear();

    emitter.emit("sum", 1, 2);
    emitter.emit("log", "test");

    expect(sum).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  it("emit on unknown event does nothing", () => {
    const emitter = new Emitter<Events>();

    expect(() => {
      // @ts-expect-error – runtime test
      emitter.emit("unknown", "test");
    }).not.toThrow();
  });

  it("handler can remove itself during emit", () => {
    const fn = vi.fn();

    const emitter = new Emitter<Events>();
    emitter.on("log", (msg) => {
      fn(msg);
      emitter.off("log");
    });

    emitter.emit("log", "a");
    emitter.emit("log", "b");

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("a");
  });
});
