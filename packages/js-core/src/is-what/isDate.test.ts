import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isDate }       from "./isDate";

describeIs<Date>("isDate", isDate, {
  valid: [
    new Date(),
  ],
  invalid: [
    NaN,
    undefined,
    "",
    false,
    [],
    {},
    Symbol(),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toBeObject();
    expectTypeOf(value).toEqualTypeOf<Date>();
  },
});
