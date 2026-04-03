import { describe, expect, it } from "vitest";
import { isAbortError } from "../isAbortError";

describe("isAbortError", () => {
  it("returns true for DOMException with name AbortError", () => {
    expect(isAbortError(new DOMException("Aborted", "AbortError"))).toBe(true);
    expect(isAbortError(new DOMException("", "AbortError"))).toBe(true);
    expect(isAbortError(new DOMException("Operation cancelled", "AbortError"))).toBe(true);
  });

  it("returns false for DOMException with a different name", () => {
    expect(isAbortError(new DOMException("Not found", "NotFoundError"))).toBe(false);
    expect(isAbortError(new DOMException("Timeout", "TimeoutError"))).toBe(false);
    expect(isAbortError(new DOMException("msg", "NetworkError"))).toBe(false);
  });

  it("returns false for regular Error instances", () => {
    expect(isAbortError(new Error("Aborted"))).toBe(false);
    expect(isAbortError(new TypeError("Aborted"))).toBe(false);
    expect(isAbortError(new RangeError("Aborted"))).toBe(false);
  });

  it("returns false for non-error values", () => {
    expect(isAbortError(null)).toBe(false);
    expect(isAbortError(undefined)).toBe(false);
    expect(isAbortError("AbortError")).toBe(false);
    expect(isAbortError(42)).toBe(false);
    expect(isAbortError({})).toBe(false);
    expect(isAbortError({ name: "AbortError" })).toBe(false);
  });

  it("acts as a type guard — narrows to DOMException", () => {
    const error: unknown = new DOMException("Aborted", "AbortError");

    if (isAbortError(error)) {
      // TypeScript should narrow error to DOMException here
      expect(error.name).toBe("AbortError");
      expect(error.message).toBe("Aborted");
    } else {
      throw new Error("Type guard should have passed");
    }
  });
});
