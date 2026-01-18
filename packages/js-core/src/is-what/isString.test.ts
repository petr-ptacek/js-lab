import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isString }     from "./isString";

describeIs<string>("isString", isString, {
  valid: [
    "",
    "Hello world"
  ],
  invalid: [
    null,
    1,
    true,
    Symbol(),
    [],
    new Map,
    new Set
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<string>();
  },
});
