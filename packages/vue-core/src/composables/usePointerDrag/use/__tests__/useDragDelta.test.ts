import { ref } from "vue";
import { describe, it, expect } from "vitest";
import { useDragDelta } from "../useDragDelta";

function mockEvent(x: number, y: number): PointerEvent {
  return {
    clientX: x,
    clientY: y,
  } as PointerEvent;
}

describe("useDragDelta", () => {
  it("computes raw and delta values", () => {
    const axis = ref<"both">("both");
    const invertAxis = ref(null);
    const lockedAxis = ref(null);

    const delta = useDragDelta(axis, invertAxis, lockedAxis);

    delta.update(10, 20, mockEvent(30, 50));

    expect(delta.rawX.value).toBe(20);
    expect(delta.rawY.value).toBe(30);
    expect(delta.absX.value).toBe(20);
    expect(delta.absY.value).toBe(30);
    expect(delta.deltaX.value).toBe(20);
    expect(delta.deltaY.value).toBe(30);
  });

  it("respects axis = x", () => {
    const axis = ref<"x">("x");
    const invertAxis = ref(null);
    const lockedAxis = ref(null);

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, 20));

    expect(delta.deltaX.value).toBe(10);
    expect(delta.deltaY.value).toBe(0);
  });

  it("respects axis = y", () => {
    const axis = ref<"y">("y");
    const invertAxis = ref(null);
    const lockedAxis = ref(null);

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, 20));

    expect(delta.deltaX.value).toBe(0);
    expect(delta.deltaY.value).toBe(20);
  });

  it("lockedAxis = x overrides axis", () => {
    const axis = ref<"both">("both");
    const invertAxis = ref(null);
    const lockedAxis = ref<"x">("x");

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, 20));

    expect(delta.deltaX.value).toBe(10);
    expect(delta.deltaY.value).toBe(0);
  });

  it("lockedAxis = y overrides axis", () => {
    const axis = ref<"both">("both");
    const invertAxis = ref(null);
    const lockedAxis = ref<"y">("y");

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, 20));

    expect(delta.deltaX.value).toBe(0);
    expect(delta.deltaY.value).toBe(20);
  });

  it("inverts x axis", () => {
    const axis = ref<"both">("both");
    const invertAxis = ref<"x">("x");
    const lockedAxis = ref(null);

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, 0));

    expect(delta.deltaX.value).toBe(-10);
  });

  it("inverts both axes", () => {
    const axis = ref<"both">("both");
    const invertAxis = ref<"both">("both");
    const lockedAxis = ref(null);

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, -20));

    expect(delta.deltaX.value).toBe(-10);
    expect(delta.deltaY.value).toBe(20);
  });

  it("locked axis is inverted correctly", () => {
    const axis = ref<"both">("both");
    const invertAxis = ref<"x">("x");
    const lockedAxis = ref<"x">("x");

    const delta = useDragDelta(axis, invertAxis, lockedAxis);
    delta.update(0, 0, mockEvent(10, 20));

    expect(delta.deltaX.value).toBe(-10);
    expect(delta.deltaY.value).toBe(0);
  });

  it("resets all values", () => {
    const delta = useDragDelta(ref("both"), ref(null), ref(null));

    delta.update(0, 0, mockEvent(10, 20));
    delta.reset();

    expect(delta.rawX.value).toBe(0);
    expect(delta.rawY.value).toBe(0);
    expect(delta.deltaX.value).toBe(0);
    expect(delta.deltaY.value).toBe(0);
    expect(delta.absX.value).toBe(0);
    expect(delta.absY.value).toBe(0);
  });
});
