import { useScrollable } from "./composables";
import type { UseControllerOptions } from "./types";

export function useController(options: UseControllerOptions) {
  const scrollable = useScrollable(options);

  return {
    ...scrollable,
  };
}
