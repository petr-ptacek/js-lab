import { describe, expect, it } from "vitest";

import { eachValue } from "./eachValue";
import type { DescribeIsOptions, IsFn } from "./types";


export function describeIs<T>(name: string, isFn: IsFn<T>, options: DescribeIsOptions<T>) {
  const { invalid = [], typeTest, valid = [] } = options;

  describe(name, () => {
    it.each(eachValue(valid))(
      "returns true for valid value %o",
      (testedValue) => {
        expect(isFn(testedValue)).toBe(true);
      },
    );

    it.each(eachValue(invalid))(
      "returns false for invalid value %o",
      (testedValue) => {
        expect(isFn(testedValue)).toBe(false);
      },
    );

    if (typeTest) {
      it("narrows type correctly", () => {
        for (const value of valid) {
          const unknownValue: unknown = value;

          if (isFn(unknownValue)) {
            typeTest(unknownValue);
          }
        }
      });
    }
  });
}
