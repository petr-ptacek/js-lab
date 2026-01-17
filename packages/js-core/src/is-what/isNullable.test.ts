import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isNullable }   from "./isNullable";

describeIs<null | undefined>("isNullable", isNullable, {
  valid: [
    null,
    undefined,
  ],
  invalid: [
    NaN,
    "",
    false,
    2,
    "jaj",
    [],
    {},
    new Date(),
    Symbol(),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toBeNullable();
  },
});
