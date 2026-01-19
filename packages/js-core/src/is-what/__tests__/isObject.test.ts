import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isObject }     from "../isObject";

describeIs<Record<string, any>>("isObject", isObject, {
  valid: [
    {},
    new Date(),
    [],
  ],
  invalid: [
    null,
    1,
    "",
    true,
    Symbol(),
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<Record<string, any>>();
  },
});
