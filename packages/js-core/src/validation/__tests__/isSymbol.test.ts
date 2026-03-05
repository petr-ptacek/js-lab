import { expectTypeOf } from "vitest";
import { describeIs }   from "./test-utils";
import { isSymbol }     from "../isSymbol";

describeIs<symbol>("isSymbol", isSymbol, {
  valid: [
    Symbol(),
  ],
  invalid: [
    null,
    1,
    true,
    [],
    new Map,
    new Set
  ],
  typeTest: (value) => {
    expectTypeOf(value).toEqualTypeOf<symbol>();
  },
});
