import { describe, beforeEach, afterEach } from "vitest";
import { effectScope, type EffectScope }   from "vue";


export function withVueScope(fn: () => void) {
  const scope = effectScope();
  try {
    scope.run(fn);
  } finally {
    scope.stop();
  }
}

export function describeVue(
  name: string,
  fn: () => void,
) {
  let scope: EffectScope | null = null;

  describe(name, () => {
    beforeEach(() => {
      scope = effectScope();
      scope.run(() => {
      });
    });

    afterEach(() => {
      scope?.stop();
      scope = null;
    });

    fn();
  });
}
