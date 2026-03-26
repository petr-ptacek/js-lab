import { afterEach, beforeEach, describe } from "vitest";
import { type EffectScope, effectScope } from "vue";

export function describeVue(name: string, fn: () => void) {
  let scope: EffectScope | null = null;

  describe(name, () => {
    beforeEach(() => {
      scope = effectScope();
      scope.run(() => {});
    });

    afterEach(() => {
      scope?.stop();
      scope = null;
    });

    fn();
  });
}
