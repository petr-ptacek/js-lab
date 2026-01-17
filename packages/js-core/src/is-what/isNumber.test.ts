import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isNumber }     from "./isNumber";

describeIs<number>("isNumber", isNumber, {
  valid: [
    1,
    -1,
    1.25,
    0,
    Number.EPSILON,
    Number.MAX_SAFE_INTEGER,
    NaN,
  ],
  invalid: [
    undefined,
    null,
    "",
    false,
    [],
    {},
    new Date(),
    Symbol(),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toBeNumber();
  },
});
