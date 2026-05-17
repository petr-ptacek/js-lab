import { useProxyValue } from "@petr-ptacek/vue-core";
import { ref } from "vue";

// Form with staged changes — user edits go to the buffer,
// nothing propagates to the source until sync() is explicitly called.

const source = ref<string | undefined>("original");

const { value, isSynced, sync, reset } = useProxyValue(source, () => "", {
  autoSync: false,
});

// User types in the input
value.value = "edited";

console.log(source.value); // "original" — source not yet updated
console.log(isSynced.value); // false

// User clicks "Save"
sync();

console.log(source.value); // "edited"
console.log(isSynced.value); // true

// User clicks "Cancel" before saving
value.value = "another edit";
reset();

console.log(value.value); // "edited" — buffer restored from source
console.log(isSynced.value); // true
