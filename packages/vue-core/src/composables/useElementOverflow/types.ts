import { type MaybeRef, type Ref } from "vue";

export type UseElementOverflowOptions = {
  enabled?: MaybeRef<boolean>;
}

export type UseElementOverflowReturn = {
  hasHorizontal: Readonly<Ref<boolean>>;
  hasVertical: Readonly<Ref<boolean>>;
  hasOverflow: Readonly<Ref<boolean>>;
  update: () => void;
  clear: () => void;
}
