import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isUndefined }  from "../isUndefined";

describeIs<undefined>("isUndefined", isUndefined, {
  valid: [
    undefined,
  ],
  invalid: [
    NaN,
    null,
    "",
    false,
    [],
    {},
    new Date(),
    Symbol(),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<undefined>();
  },
});
