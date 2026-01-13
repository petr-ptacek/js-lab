import { expectTypeOf }    from "vitest";

import { describeIs }      from "./utils";
import { isNotEmptyArray } from "../isNotEmptyArray";

describeIs<unknown[]>("isEmptyArray", isNotEmptyArray, {
  valid: [
    [1],
    [1, 2],
    [1, 2, 3],
  ],
  invalid: [
    NaN,
    undefined,
    "",
    false,
    {},
    Symbol(),
    [],
  ],
  typeTest: (value) => {
    expectTypeOf(value).toBeArray();
    expectTypeOf(value).toEqualTypeOf<unknown[]>();
  },
});
