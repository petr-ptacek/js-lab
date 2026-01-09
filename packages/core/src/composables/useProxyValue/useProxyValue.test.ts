import { describe, it, expect, vi } from "vitest";
import { expectTypeOf } from "vitest";
import { ref, nextTick } from "vue";

import { useProxyValue } from "./useProxyValue";

describe("useProxyValue", () => {
  it("uses defaultValue when sourceValue is undefined", () => {
    const source = ref<string | undefined>(undefined);

    const { value, buffer, isApplied } = useProxyValue(source, "default");

    expect(value.value).toBe("default");
    expect(buffer.value).toBe("default");
    expect(isApplied.value).toBe(false);
  });

  it("uses sourceValue when defined", () => {
    const source = ref<string | undefined>("initial");

    const { value, buffer, isApplied } = useProxyValue(source, "default");

    expect(value.value).toBe("initial");
    expect(buffer.value).toBe("initial");
    expect(isApplied.value).toBe(true);
  });

  it("writes to buffer when value is changed", () => {
    const source = ref<string | undefined>("initial");

    const { value, buffer, isApplied } = useProxyValue(source, "default", {
      autoApply: false,
    });

    value.value = "changed";

    expect(buffer.value).toBe("changed");
    expect(source.value).toBe("initial");
    expect(isApplied.value).toBe(false);
  });

  it("auto-applies changes when autoApply is true", () => {
    const source = ref<string | undefined>("initial");

    const { value } = useProxyValue(source, "default", {
      autoApply: true,
    });

    value.value = "changed";

    expect(source.value).toBe("changed");
  });

  it("does not auto-apply when autoApply is false", () => {
    const source = ref<string | undefined>("initial");

    const { value, apply } = useProxyValue(source, "default", {
      autoApply: false,
    });

    value.value = "changed";

    expect(source.value).toBe("initial");

    apply();
    expect(source.value).toBe("changed");
  });

  it("reset restores buffer from sourceValue", () => {
    const source = ref<string | undefined>("initial");

    const { value, buffer, reset, isApplied } = useProxyValue(source, "default", {
      autoApply: false,
    });

    value.value = "changed";
    expect(buffer.value).toBe("changed");
    expect(isApplied.value).toBe(false);

    reset();

    expect(buffer.value).toBe("initial");
    expect(isApplied.value).toBe(true);
  });

  it("reset uses defaultValue when sourceValue is undefined", () => {
    const source = ref<string | undefined>(undefined);

    const { value, buffer, reset } = useProxyValue(source, "default", {
      autoApply: false,
    });

    value.value = "changed";
    reset();

    expect(buffer.value).toBe("default");
  });

  it("reacts to external sourceValue changes", async () => {
    const source = ref<string | undefined>("initial");

    const { buffer, isApplied } = useProxyValue(source, "default");

    source.value = "external";
    await nextTick();

    expect(buffer.value).toBe("external");
    expect(isApplied.value).toBe(true);
  });

  it("debouncedValue debounces writes to buffer", async () => {
    vi.useFakeTimers();

    const source = ref<string | undefined>("initial");

    const { debouncedValue, buffer } = useProxyValue(source, "default", {
      debounce: 100,
      autoApply: false,
    });

    debouncedValue.value = "debounced";

    expect(buffer.value).toBe("initial");

    vi.advanceTimersByTime(100);
    await nextTick();

    expect(buffer.value).toBe("debounced");

    vi.useRealTimers();
  });

  it("applyDebounced debounces committing buffer to source", async () => {
    vi.useFakeTimers();

    const source = ref<string | undefined>("initial");

    const { value, applyDebounced } = useProxyValue(source, "default", {
      autoApply: false,
      applyDebounce: 100,
    });

    value.value = "changed";
    applyDebounced();

    expect(source.value).toBe("initial");

    vi.advanceTimersByTime(100);
    await nextTick();

    expect(source.value).toBe("changed");

    vi.useRealTimers();
  });

  it("apply does nothing when sourceValue is undefined", () => {
    const source = ref<string | undefined>(undefined);

    const { value, apply } = useProxyValue(source, "default", {
      autoApply: false,
    });

    value.value = "changed";
    apply();

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
      autoApply: false,
    });

    expect(buffer.value).toBe("first");

    reset();
    expect(buffer.value).toBe("second");
  });

  it("treats null as a valid value", () => {
    const source = ref<string | null | undefined>(null);

    const { value, buffer, isApplied } = useProxyValue(source, "default");

    expect(value.value).toBeNull();
    expect(buffer.value).toBeNull();
    expect(isApplied.value).toBe(true);
  });

  it("reset uses latest sourceValue after external change", async () => {
    const source = ref<string | undefined>("initial");

    const { buffer, reset } = useProxyValue(source, "default", {
      autoApply: false,
    });

    source.value = "external";
    await nextTick();

    buffer.value = "changed";
    reset();

    expect(buffer.value).toBe("external");
  });

  it("sets isApplied back to true after apply", () => {
    const source = ref<string | undefined>("initial");

    const { value, isApplied, apply } = useProxyValue(source, "default", {
      autoApply: false,
    });

    value.value = "changed";
    expect(isApplied.value).toBe(false);

    apply();
    expect(isApplied.value).toBe(true);
  });

  it("apply after reset keeps source unchanged", () => {
    const source = ref<string | undefined>("initial");

    const { reset, apply } = useProxyValue(source, "default", {
      autoApply: false,
    });

    reset();
    apply();

    expect(source.value).toBe("initial");
  });

  it("exposes correct public API types", () => {
    const source = ref<string | undefined>("test");

    const api = useProxyValue(source, "default");

    expectTypeOf(api.value.value).toBeString();
    expectTypeOf(api.buffer.value).toBeString();
    expectTypeOf(api.isApplied.value).toBeBoolean();
  });
});
