import type { Ref } from "vue";

export type ReadonlyRef<T> = Readonly<Ref<T, T>>;
