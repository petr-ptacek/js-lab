import { describe, expect, it } from "vitest";

import { eachValue }            from "./eachValue";

type IsFn<T> = (value: unknown) => value is T;

interface DescribeIsOptions<T> {
  valid: unknown[];
  invalid: unknown[];
  typeTest?: (value: T) => void;
}

export function describeIs<T>(name: string, isFn: IsFn<T>, options: DescribeIsOptions<T>) {
  const { invalid = [], typeTest, valid = [] } = options;

  describe(name, () => {
    it.each(eachValue(valid))(
      "returns true for %o",
      (testedValue) => {
        expect(isFn(testedValue)).toBe(true);
      },
    );

    it.each(eachValue(invalid))(
      "returns false for %o",
      (testedValue) => {
        expect(isFn(testedValue)).toBe(false);
      },
    );

    if ( typeTest ) {
      it("narrows type correctly", () => {
        for ( const value of valid ) {
          const unknownValue: unknown = value;

          if ( isFn(unknownValue) ) {
            typeTest(unknownValue);
          }
        }
      });
    }
  });
}
