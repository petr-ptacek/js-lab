import { it, expect, vi } from "vitest";
import { expectTypeOf }   from "vitest";
import { ref, nextTick }  from "vue";
import { describeVue }    from "../../../test-utils";

import { useProxyValue } from "../useProxyValue";

describeVue("useProxyValue", () => {
  it("uses defaultValue when sourceValue is undefined", () => {
    const source = ref<string | undefined>(undefined);

    const { value, buffer, isSynced } = useProxyValue(source, "default");

    expect(value.value).toBe("default");
    expect(buffer.value).toBe("default");
    expect(isSynced.value).toBe(false);
  });

  it("uses sourceValue when defined", () => {
    const source = ref<string | undefined>("initial");

    const { value, buffer, isSynced } = useProxyValue(source, "default");

    expect(value.value).toBe("initial");
    expect(buffer.value).toBe("initial");
    expect(isSynced.value).toBe(true);
  });

  it("writes to buffer when value is changed", () => {
    const source = ref<string | undefined>("initial");

    const { value, buffer, isSynced } = useProxyValue(source, "default", {
      autoSync: false,
    });

    value.value = "changed";

    expect(buffer.value).toBe("changed");
    expect(source.value).toBe("initial");
    expect(isSynced.value).toBe(false);
  });

  it("auto-applies changes when autoSync is true", () => {
    const source = ref<string | undefined>("initial");

    const { value } = useProxyValue(source, "default", {
      autoSync: true,
    });

    value.value = "changed";

    expect(source.value).toBe("changed");
  });

  it("does not auto-apply when autoSync is false", () => {
    const source = ref<string | undefined>("initial");

    const { value, sync } = useProxyValue(source, "default", {
      autoSync: false,
    });

    value.value = "changed";

    expect(source.value).toBe("initial");

    sync();
    expect(source.value).toBe("changed");
  });

  it("reset restores buffer from sourceValue", () => {
    const source = ref<string | undefined>("initial");

    const { value, buffer, reset, isSynced } = useProxyValue(source, "default", {
      autoSync: false,
    });

    value.value = "changed";
    expect(buffer.value).toBe("changed");
    expect(isSynced.value).toBe(false);

    reset();

    expect(buffer.value).toBe("initial");
    expect(isSynced.value).toBe(true);
  });

  it("reset uses defaultValue when sourceValue is undefined", () => {
    const source = ref<string | undefined>(undefined);

    const { value, buffer, reset } = useProxyValue(source, "default", {
      autoSync: false,
    });

    value.value = "changed";
    reset();

    expect(buffer.value).toBe("default");
  });

  it("reacts to external sourceValue changes", async () => {
    const source = ref<string | undefined>("initial");

    const { buffer, isSynced } = useProxyValue(source, "default");

    source.value = "external";
    await nextTick();

    expect(buffer.value).toBe("external");
    expect(isSynced.value).toBe(true);
  });

  it("debouncedValue debounces writes to buffer", async () => {
    vi.useFakeTimers();

    const source = ref<string | undefined>("initial");

    const { debouncedValue, buffer } = useProxyValue(source, "default", {
      debounce: 100,
      autoSync: false,
    });

    debouncedValue.value = "debounced";

    expect(buffer.value).toBe("initial");

    vi.advanceTimersByTime(100);
    await nextTick();

    expect(buffer.value).toBe("debounced");

    vi.useRealTimers();
  });

  it("syncDebounced debounces committing buffer to source", async () => {
    vi.useFakeTimers();

    const source = ref<string | undefined>("initial");

    const { value, syncDebounced } = useProxyValue(source, "default", {
      autoSync: false,
      syncDebounce: 100,
    });

    value.value = "changed";
    syncDebounced();

    expect(source.value).toBe("initial");

    vi.advanceTimersByTime(100);
    await nextTick();

    expect(source.value).toBe("changed");

    vi.useRealTimers();
  });

  it("sync does nothing when sourceValue is undefined", () => {
    const source = ref<string | undefined>(undefined);

    const { value, sync } = useProxyValue(source, "default", {
      autoSync: false,
    });

    value.value = "changed";
    sync();

    expect(source.value).toBeUndefined();
  });

  it("resolves defaultValue from factory function", () => {
    const source = ref<string | undefined>(undefined);
    const factory = vi.fn(() => "lazy-default");

    const { value, buffer } = useProxyValue(source, factory);

    expect(value.value).toBe("lazy-default");
    expect(buffer.value).toBe("lazy-default");
    expect(factory).toHaveBeenCalledTimes(1);
  });

  it("reset re-evaluates lazy defaultValue", () => {
    const source = ref<string | undefined>(undefined);
    const factory = vi.fn()
                      .mockReturnValueOnce("first")
                      .mockReturnValueOnce("second");

    const { buffer, reset } = useProxyValue(source, factory, {
      autoSync: false,
    });

    expect(buffer.value).toBe("first");

    reset();
    expect(buffer.value).toBe("second");
  });

  it("treats null as a valid value", () => {
    const source = ref<string | null | undefined>(null);

    const { value, buffer, isSynced } = useProxyValue(source, "default");

    expect(value.value).toBeNull();
    expect(buffer.value).toBeNull();
    expect(isSynced.value).toBe(true);
  });

  it("reset uses latest sourceValue after external change", async () => {
    const source = ref<string | undefined>("initial");

    const { buffer, reset } = useProxyValue(source, "default", {
      autoSync: false,
    });

    source.value = "external";
    await nextTick();

    buffer.value = "changed";
    reset();

    expect(buffer.value).toBe("external");
  });

  it("sets isSynced back to true after sync", () => {
    const source = ref<string | undefined>("initial");

    const { value, isSynced, sync } = useProxyValue(source, "default", {
      autoSync: false,
    });

    value.value = "changed";
    expect(isSynced.value).toBe(false);

    sync();
    expect(isSynced.value).toBe(true);
  });

  it("sync after reset keeps source unchanged", () => {
    const source = ref<string | undefined>("initial");

    const { reset, sync } = useProxyValue(source, "default", {
      autoSync: false,
    });

    reset();
    sync();

    expect(source.value).toBe("initial");
  });

  it("exposes correct public API types", () => {
    const source = ref<string | undefined>("test");

    const api = useProxyValue(source, "default");

    expectTypeOf(api.value.value).toBeString();
    expectTypeOf(api.buffer.value).toBeString();
    expectTypeOf(api.isSynced.value).toBeBoolean();
    expectTypeOf(api.disableAutoSync).toBeFunction();
    expectTypeOf(api.enableAutoSync).toBeFunction();
  });

  it("does not sync automatically when autoSync is disabled", () => {
    const source = ref<string | undefined>("initial");

    const {
      value,
      buffer,
      isSynced,
      disableAutoSync,
    } = useProxyValue(source, "default");

    disableAutoSync();

    value.value = "changed";

    expect(buffer.value).toBe("changed");
    expect(source.value).toBe("initial");
    expect(isSynced.value).toBe(false);
  });

  it("syncs automatically again after autoSync is re-enabled", () => {
    const source = ref<string | undefined>("initial");

    const {
      value,
      buffer,
      isSynced,
      disableAutoSync,
      enableAutoSync,
    } = useProxyValue(source, "default");

    disableAutoSync();
    value.value = "changed";

    expect(source.value).toBe("initial");
    expect(isSynced.value).toBe(false);

    enableAutoSync();
    value.value = "changed-again";

    expect(source.value).toBe("changed-again");
    expect(buffer.value).toBe("changed-again");
    expect(isSynced.value).toBe(true);
  });

  it("manual sync works even when autoSync is disabled", () => {
    const source = ref<string | undefined>("initial");

    const {
      value,
      sync,
      isSynced,
      disableAutoSync,
    } = useProxyValue(source, "default");

    disableAutoSync();

    value.value = "changed";
    expect(isSynced.value).toBe(false);

    sync();

    expect(source.value).toBe("changed");
    expect(isSynced.value).toBe(true);
  });

  it("disableAutoSync does not affect external sourceValue updates", async () => {
    const source = ref<string | undefined>("initial");

    const {
      buffer,
      isSynced,
      disableAutoSync,
    } = useProxyValue(source, "default");

    disableAutoSync();

    source.value = "external";
    await nextTick();

    expect(buffer.value).toBe("external");
    expect(isSynced.value).toBe(true);
  });

  it("exposes reactive autoSync state", () => {
    const source = ref<string | undefined>("initial");

    const {
      isAutoSync,
      disableAutoSync,
      enableAutoSync,
    } = useProxyValue(source, "default");

    expect(isAutoSync.value).toBe(true);

    disableAutoSync();
    expect(isAutoSync.value).toBe(false);

    enableAutoSync();
    expect(isAutoSync.value).toBe(true);
  });

  it("concrete usage", async () => {
    const model = ref<string | undefined>("hello");

    const {
      value,
      isSynced,
      reset,
    } = useProxyValue(model, () => "");

    expect(value.value).toBe("hello");

    value.value = "world";
    expect(model.value).toBe("world");
    expect(isSynced.value).toBe(true);


    reset();
    expect(value.value).toBe("world");
    expect(isSynced.value).toBe(true);
  });
});
