import { expectTypeOf } from "vitest";

import { describeIs }  from "./test-utils";
import { isNaNNumber } from "./isNaNNumber";

describeIs<number>("isNotNaNNumber", isNaNNumber, {
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
