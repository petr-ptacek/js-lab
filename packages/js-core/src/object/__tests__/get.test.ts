import { it, expect, describe } from "vitest";
import { get }                  from "../get";

describe("get", () => {
  it("object has path", () => {
    const obj = { a: 1, b: { c: { d: { e: { f: "f" } } } } } as const;

    expect(get(obj, "a")).toBe(1);
    expect(get(obj, "b.c.d.e.f")).toBe("f");
  });

  it.each([
    ["a", 1],
    ["b.c.d.e.f", "f"],
  ])("returns %o for path %s", (path, expected) => {
    const obj = {
      a: 1,
      b: { c: { d: { e: { f: "f" } } } },
    } as const;

    expect(get(obj, path as any)).toBe(expected);
  });

  it("object has not path", () => {
    const obj = { a: 1, b: { c: { d: { e: { f: "f" } } } } } as const;

    expect(get(obj, "foo.bar.baz" as any)).toBe(undefined);
  });

  it("test default value", () => {
    const obj = { a: 1, b: { c: { d: { e: { f: "f" } } } } } as const;

    expect(get(obj, "b.c.d", "default")).not.toBe("default");
    expect(get(obj, "foo.bar.baz" as any, "default")).toBe("default");
  });

  it("returns undefined vs null correctly", () => {
    const obj = {
      a: undefined,
      b: null,
    } as const;

    expect(get(obj, "a")).toBeUndefined();
    expect(get(obj, "a", "default")).toBe("default");

    expect(get(obj, "b")).toBeNull();
    expect(get(obj, "b", "default")).toBeNull();
  });

  it("returns undefined when path breaks in the middle", () => {
    const obj = { a: { b: 1 } } as const;

    expect(get(obj, "a.b.c" as any)).toBeUndefined();
    expect(get(obj, "a.b.c" as any, "default")).toBe("default");
  });

  it("returns undefined when path hits primitive", () => {
    const obj = { a: 1 } as const;

    expect(get(obj, "a.b" as any)).toBeUndefined();
  });

  it("does not use default for falsy values", () => {
    const obj = {
      a: 0,
      b: false,
      c: "",
    } as const;

    expect(get(obj, "a", 42)).toBe(0);
    expect(get(obj, "b", true)).toBe(false);
    expect(get(obj, "c", "x")).toBe("");
  });

  it("supports array index in path", () => {
    const obj = {
      a: [{ b: "x" }],
    } as const;

    expect(get(obj, "a.0.b")).toBe("x");
  });

  it("returns undefined for invalid array index", () => {
    const obj = {
      a: [{ b: "x" }],
    } as const;

    expect(get(obj, "a.1.b")).toBeUndefined();
    expect(get(obj, "a.foo.b" as any)).toBeUndefined();
  });

  it("supports array index at root", () => {
    const obj = [{ a: 1 }, { a: 2 }] as const;

    expect(get(obj, "0.a")).toBe(1);
    expect(get(obj, "1.a")).toBe(2);
  });

  it("returns undefined for invalid root index", () => {
    const obj = [{ a: 1 }] as const;

    expect(get(obj, "1.a")).toBeUndefined();
    expect(get(obj, "foo" as any)).toBeUndefined();
  });
});
