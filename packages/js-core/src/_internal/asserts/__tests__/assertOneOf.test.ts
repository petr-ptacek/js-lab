import { describe, expect, it } from "vitest";
import { assertOneOf } from "../assertOneOf";

describe("assertOneOf", () => {
  const allowed = ["contain", "cover"] as const;

  it("does not throw for allowed values", () => {
    expect(() =>
      assertOneOf("mode", "contain", allowed),
    ).not.toThrow();
  });

  it("throws for disallowed values", () => {
    expect(() =>
      assertOneOf("mode", "stretch", allowed),
    ).toThrow("one of [contain, cover]");
  });
});
