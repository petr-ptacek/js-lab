import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isNull }       from "../isNull";

describeIs<null>("isNull", isNull, {
  valid: [
    null,
  ],
  invalid: [
    NaN,
    undefined,
    "",
    false,
    [],
    {},
    new Date(),
    Symbol(),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<null>();
  },
});
