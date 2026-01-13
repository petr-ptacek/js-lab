import { describe } from "vitest";

import { describeIs } from "./describeIs";
import type { GuardTestCase } from "./types";

export function describeGuards(
  cases: Record<string, GuardTestCase<any>>,
) {
  describe("type guards", () => {
    for (const [name, testCase] of Object.entries(cases)) {
      describeIs(
        name,
        testCase.fn,
        testCase,
      );
    }
  });
}
