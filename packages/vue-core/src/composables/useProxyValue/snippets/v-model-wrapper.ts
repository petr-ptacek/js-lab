import { useProxyValue } from "@petr-ptacek/vue-core";
import { computed } from "vue";

// Minimal v-model wrapper in a child component.
// Changes are immediately synced back to the parent (autoSync: true is the default).

const props = {
  modelValue: undefined as string | undefined,
};

const emit = (_e: "update:modelValue", _v: string) => {};

const { value } = useProxyValue(
  computed({
    get: () => props.modelValue,
    set: (v) => {
      if (v !== undefined) emit("update:modelValue", v);
    },
  }),
  () => ""
);

// value is a writable computed ref — use directly in <input v-model="value" />
console.log(value.value); // "" (defaultValue, because modelValue was undefined)
