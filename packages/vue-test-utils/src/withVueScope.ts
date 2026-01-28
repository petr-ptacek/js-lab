import { effectScope } from "vue";

export function withVueScope(fn: () => void) {
  const scope = effectScope();
  try {
    scope.run(fn);
  } finally {
    scope.stop();
  }
}
