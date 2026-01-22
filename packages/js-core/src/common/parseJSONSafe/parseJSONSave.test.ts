import { describe, it, expect } from "vitest";
import { parseJSONSafe } from "./parseJSONSafe";

describe("parseJSONSafe", () => {
  it("parses valid JSON string", () => {
    const json = "{\"name\":\"Bouráku\",\"age\":33}";

    const result = parseJSONSafe<{ name: string; age: number }>(json);

    expect(result).toEqual({
      name: "Bouráku",
      age: 33,
    });
  });

  it("returns fallback when JSON is invalid", () => {
    const invalidJson = "{name: Bouráku}";

    const fallback = { name: "fallback" };

    const result = parseJSONSafe<typeof fallback>(invalidJson, fallback);

    expect(result).toEqual(fallback);
  });

  it("returns undefined when JSON is invalid and no fallback is provided", () => {
    const invalidJson = "{invalid json}";

    const result = parseJSONSafe(invalidJson);

    expect(result).toBeUndefined();
  });

  it("parses primitive JSON values", () => {
    expect(parseJSONSafe<number>("123")).toBe(123);
    expect(parseJSONSafe<boolean>("true")).toBe(true);
    expect(parseJSONSafe<string>("\"hello\"")).toBe("hello");
    expect(parseJSONSafe<null>("null")).toBeNull();
  });

  it("returns fallback when value is empty string", () => {
    const result = parseJSONSafe("", { ok: false });

    expect(result).toEqual({ ok: false });
  });

  it("does not mutate fallback object", () => {
    const fallback = { count: 1 };

    const result = parseJSONSafe("{invalid}", fallback);

    expect(result).toEqual({ count: 1 });
    expect(fallback).toEqual({ count: 1 });
  });
});
