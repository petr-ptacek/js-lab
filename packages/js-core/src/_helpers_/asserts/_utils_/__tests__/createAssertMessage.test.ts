import { describe, expect, it } from "vitest";
import { createAssertMessage } from "../createAssertMessage";

describe("createAssertMessage", () => {
  it("creates a standard assert error message", () => {
    const message = createAssertMessage(
      "width",
      "a positive finite number",
      0,
    );

    expect(message).toBe(
      "width must be a positive finite number, got: 0",
    );
  });

  it("stringifies special values correctly", () => {
    expect(
      createAssertMessage("value", "defined", undefined),
    ).toBe("value must be defined, got: undefined");

    expect(
      createAssertMessage("value", "a finite number", NaN),
    ).toBe("value must be a finite number, got: NaN");
  });
});
