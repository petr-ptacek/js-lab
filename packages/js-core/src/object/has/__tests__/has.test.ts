import { describe, expect, it } from "vitest";
import { has }                  from "../has";

describe("has", () => {
  it("returns true for existing shallow path", () => {
    const obj = { a: 1, b: "hello" } as const;

    expect(has(obj, "a")).toBe(true);
    expect(has(obj, "b")).toBe(true);
  });

  it("returns true for existing nested path", () => {
    const obj = { a: { b: { c: { d: "deep" } } } } as const;

    expect(has(obj, "a.b.c.d")).toBe(true);
  });

  it("returns false for non-existing path", () => {
    const obj = { a: 1 };

    expect(has(obj, "b" as any)).toBe(false);
    expect(has(obj, "a.b.c" as any)).toBe(false);
  });

  it("returns true for falsy values (0, false, empty string)", () => {
    const obj = {
      zero: 0,
      flag: false,
      empty: "",
    } as const;

    expect(has(obj, "zero")).toBe(true);
    expect(has(obj, "flag")).toBe(true);
    expect(has(obj, "empty")).toBe(true);
  });

  it("returns true for null value", () => {
    const obj = { value: null } as const;

    expect(has(obj, "value")).toBe(true);
  });

  it("returns true for undefined value (key exists)", () => {
    const obj: { value: undefined } = { value: undefined };

    expect(has(obj, "value")).toBe(true);
  });

  it("returns false for key that is not present at all", () => {
    const obj: Record<string, unknown> = { a: 1 };

    expect(has(obj, "b")).toBe(false);
  });

  it("returns false when path breaks in the middle", () => {
    const obj = { a: { b: 1 } } as const;

    expect(has(obj, "a.b.c" as any)).toBe(false);
  });

  it("supports array index in path", () => {
    const obj = { items: ["x", "y", "z"] } as const;

    expect(has(obj, "items.0")).toBe(true);
    expect(has(obj, "items.2")).toBe(true);
    expect(has(obj, "items.99" as any)).toBe(false);
  });

  it("supports nested object inside array", () => {
    const obj = { list: [{ name: "Alice" }] } as const;

    expect(has(obj, "list.0.name")).toBe(true);
    expect(has(obj, "list.0.age" as any)).toBe(false);
  });

  it("returns false for empty object on non-existing key", () => {
    const obj: Record<string, unknown> = {};

    expect(has(obj, "anything")).toBe(false);
  });
});


