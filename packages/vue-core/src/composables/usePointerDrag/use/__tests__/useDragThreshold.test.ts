import { describe, it, expect } from "vitest";
import { ref }                  from "vue";

import { useDragThreshold } from "../useDragThreshold";
import type { DragAxis }    from "../../types";

describe("useDragThreshold", () => {
  it("starts with passed = false", () => {
    const axis = ref<DragAxis>("x");
    const threshold = ref(10);

    const { passed } = useDragThreshold(axis, threshold);

    expect(passed.value).toBe(false);
  });

  it("does not pass threshold when movement is below threshold", () => {
    const axis = ref<DragAxis>("x");
    const threshold = ref(10);

    const { passed, check } = useDragThreshold(axis, threshold);

    const result = check(5, 0);

    expect(result).toBe(false);
    expect(passed.value).toBe(false);
  });

  it("passes threshold on x axis", () => {
    const axis = ref<DragAxis>("x");
    const threshold = ref(10);

    const { passed, check } = useDragThreshold(axis, threshold);

    const result = check(10, 0);

    expect(result).toBe(true);
    expect(passed.value).toBe(true);
  });

  it("passes threshold on y axis", () => {
    const axis = ref<DragAxis>("y");
    const threshold = ref(8);

    const { passed, check } = useDragThreshold(axis, threshold);

    const result = check(0, 9);

    expect(result).toBe(true);
    expect(passed.value).toBe(true);
  });

  it("passes threshold on both axis using max(absX, absY)", () => {
    const axis = ref<DragAxis>("both");
    const threshold = ref(12);

    const { passed, check } = useDragThreshold(axis, threshold);

    const result = check(5, 12);

    expect(result).toBe(true);
    expect(passed.value).toBe(true);
  });

  it("passes immediately when threshold is zero", () => {
    const axis = ref<DragAxis>("x");
    const threshold = ref(0);

    const { passed, check } = useDragThreshold(axis, threshold);

    const result = check(0, 0);

    expect(result).toBe(true);
    expect(passed.value).toBe(true);
  });

  it("passes immediately when threshold is negative", () => {
    const axis = ref<DragAxis>("y");
    const threshold = ref(-5);

    const { passed, check } = useDragThreshold(axis, threshold);

    const result = check(0, 0);

    expect(result).toBe(true);
    expect(passed.value).toBe(true);
  });

  it("is one-shot: once passed, it stays passed", () => {
    const axis = ref<DragAxis>("x");
    const threshold = ref(10);

    const { passed, check } = useDragThreshold(axis, threshold);

    check(10, 0);
    expect(passed.value).toBe(true);

    const result = check(0, 0);

    expect(result).toBe(true);
    expect(passed.value).toBe(true);
  });

  it("can be reset", () => {
    const axis = ref<DragAxis>("x");
    const threshold = ref(10);

    const { passed, check, reset } = useDragThreshold(axis, threshold);

    check(10, 0);
    expect(passed.value).toBe(true);

    reset();
    expect(passed.value).toBe(false);

    const result = check(5, 0);
    expect(result).toBe(false);
    expect(passed.value).toBe(false);
  });
});
