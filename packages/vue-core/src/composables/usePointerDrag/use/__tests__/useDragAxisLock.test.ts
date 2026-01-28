import { describe, it, expect } from "vitest";
import { ref }                  from "vue";

import { useDragAxisLock } from "../useDragAxisLock";
import type { DragAxis }   from "../../types";

describe("useDragAxisLock", () => {
  it("starts with locked = null", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(true);

    const { locked } = useDragAxisLock(axis, enabled);

    expect(locked.value).toBeNull();
  });

  it("does nothing when locking is disabled", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(false);

    const { locked, update } = useDragAxisLock(axis, enabled);

    update(10, 2);

    expect(locked.value).toBeNull();
  });

  it("does nothing when axis is not 'both'", () => {
    const axis = ref<DragAxis>("x");
    const enabled = ref(true);

    const { locked, update } = useDragAxisLock(axis, enabled);

    update(5, 20);

    expect(locked.value).toBeNull();
  });

  it("locks to x when absX is dominant", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(true);

    const { locked, update } = useDragAxisLock(axis, enabled);

    update(20, 5);

    expect(locked.value).toBe("x");
  });

  it("locks to y when absY is dominant", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(true);

    const { locked, update } = useDragAxisLock(axis, enabled);

    update(5, 20);

    expect(locked.value).toBe("y");
  });

  it("locks to y when absX equals absY", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(true);

    const { locked, update } = useDragAxisLock(axis, enabled);

    update(10, 10);

    expect(locked.value).toBe("y");
  });

  it("is one-shot: once locked, it does not change", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(true);

    const { locked, update } = useDragAxisLock(axis, enabled);

    update(20, 5);
    expect(locked.value).toBe("x");

    update(0, 100); // pokus o změnu
    expect(locked.value).toBe("x");
  });

  it("can be reset", () => {
    const axis = ref<DragAxis>("both");
    const enabled = ref(true);

    const { locked, update, reset } = useDragAxisLock(axis, enabled);

    update(5, 20);
    expect(locked.value).toBe("y");

    reset();
    expect(locked.value).toBeNull();

    update(30, 10);
    expect(locked.value).toBe("x");
  });
});
