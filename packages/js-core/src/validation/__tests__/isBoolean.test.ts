import { expect } from "vitest";
import { isBoolean } from "../isBoolean";
import { describeGuards } from "./test-utils/describeGuards";

describeGuards({
  isBoolean: {
    fn: isBoolean,
    valid: [true, false],
    invalid: [null, undefined, 1, 0, {}, [], ""],
    typeTest: (v) => {
      expect(v).toBeTypeOf("boolean");
    },
  },
});
