import { describe, it, expect } from "vitest";
import { isString } from "../isString";

describe("isString", () => {
  it("returns true for strings", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString("123")).toBe(true);
    expect(isString(" ")).toBe(true);
    expect(isString("true")).toBe(true);
    expect(isString("null")).toBe(true);
    expect(isString("undefined")).toBe(true);
    expect(isString(String(123))).toBe(true);
    expect(isString(new String("test").valueOf())).toBe(true);
  });

  it("returns false for non-strings", () => {
    expect(isString(123)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString(() => {})).toBe(false);
    expect(isString(Symbol("test"))).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(/regex/)).toBe(false);
  });

  it("returns false for String objects", () => {
    expect(isString(new String("test"))).toBe(false);
    expect(isString(Object("test"))).toBe(false);
  });

  it("works as type guard", () => {
    const value: unknown = "test string";

    if (isString(value)) {
      // TypeScript should infer value as string
      expect(value.length).toBe(11);
      expect(value.toUpperCase()).toBe("TEST STRING");
      expect(value.charAt(0)).toBe("t");
      expect(value.includes("test")).toBe(true);
    } else {
      // This should not be reached
      throw new Error("Type guard should have passed");
    }
  });

  it("handles edge cases", () => {
    // Template literals
    expect(isString(`template literal`)).toBe(true);
    expect(isString(`${123}`)).toBe(true);

    // Empty string variations
    expect(isString("")).toBe(true);
    expect(isString(String())).toBe(true);

    // Special characters
    expect(isString("🎉")).toBe(true);
    expect(isString("\n\t\r")).toBe(true);
    expect(isString("\"'`")).toBe(true);
  });

  it("matches typeof behavior exactly", () => {
    const testCases = [
      "string",
      "",
      123,
      true,
      null,
      undefined,
      [],
      {},
      new String("test"),
      Symbol("test")
    ];

    testCases.forEach(testCase => {
      expect(isString(testCase)).toBe(typeof testCase === "string");
    });
  });
});
