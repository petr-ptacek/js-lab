import { computed, type MaybeRef, toValue } from "vue";
import { sum } from "../utils";

export function useSum(a: MaybeRef<number>, b: MaybeRef<number>) {
  const sumared = computed(() => {
    return sum(toValue(a), toValue(b));
  });

  return { sumared };
}
