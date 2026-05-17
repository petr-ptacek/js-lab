import { useProxyValue } from "@petr-ptacek/vue-core";
import { ref } from "vue";

// Debounced input — the UI responds immediately (value),
// but the buffer (and source) only update after the user pauses typing.
// Useful for search inputs or auto-saving forms.

const source = ref<string | undefined>("");

const { value, debouncedValue } = useProxyValue(source, () => "", {
  debounce: 300, // buffer updates 300 ms after the last write to debouncedValue
  autoSync: true,
});

// In the template:
//   <input v-model="debouncedValue" />   ← debounced; drives source after pause
//   <input v-model="value" />            ← immediate; use when you need instant reactivity

// Outside a component context, reads are synchronous:
console.log(value.value); // ""
