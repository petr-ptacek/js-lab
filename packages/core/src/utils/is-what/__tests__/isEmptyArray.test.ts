import { expectTypeOf } from "vitest";
import { isEmptyArray } from "../isEmptyArray";
import { describeIs }   from "./utils";

describeIs<unknown[]>("isEmptyArray", isEmptyArray, {
  valid: [
    [],
  ],
  invalid: [
    NaN,
    undefined,
    "",
    false,
    {},
    Symbol(),
    [1],
    ["", -1],
  ],
  typeTest: (value) => {
    expectTypeOf(value).toBeArray();
    expectTypeOf(value).toEqualTypeOf<unknown[]>();
  },
});
