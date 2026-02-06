import type { Ref } from "vue";

export type UseStableLoadingOptions = {
  delay?: number;
  minVisible?: number;
};

export type UseStableLoadingReturn = {
  loading: Readonly<Ref<boolean>>;
  isDelaying: Readonly<Ref<boolean>>;
  isHolding: Readonly<Ref<boolean>>;
}
