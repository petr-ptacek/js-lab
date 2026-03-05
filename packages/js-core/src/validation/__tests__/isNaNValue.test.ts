import { expectTypeOf } from "vitest";

import { describeIs } from "./test-utils";
import { isNaNValue } from "../isNaNValue";

describeIs<number>("isNotNaNNumber", isNaNValue, {
  valid: [
    NaN
  ],
  invalid: [
    undefined,
    "",
    false,
    {},
    Symbol(),
    [],
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<number>();
  },
});
