import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { describeVue }                           from "@petr-ptacek/vue-test-utils";
import type { UsePointerDragOptions }            from "../types.ts";
import { usePointerDrag }                        from "../usePointerDrag";
import { createTargetEl, createPointerEvent }    from "./helpers.ts";

describeVue("usePointerDrag – threshold behavior", () => {
  let target: HTMLElement;

  beforeEach(() => {
    target = createTargetEl();
  });

  afterEach(() => {
    target.remove();
  });

  it("does nothing when disabled", () => {
    const onStart = vi.fn();

    const { onPointerDown, isPressed } = usePointerDrag({
      disabled: true,
      onStart,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    expect(isPressed.value).toBe(false);
    expect(onStart).not.toHaveBeenCalled();
  });

  it("sets pressed state and calls onStart", () => {
    const onStart = vi.fn();

    const { onPointerDown, isPressed, startX, startY } = usePointerDrag({
      onStart,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 10,
        y: 20,
        target,
      }),
    );

    expect(isPressed.value).toBe(true);
    expect(startX.value).toBe(10);
    expect(startY.value).toBe(20);
    expect(onStart).toHaveBeenCalledOnce();
  });

  it("aborts drag when onStart returns false", () => {
    const onStart = vi.fn(() => false) as UsePointerDragOptions["onStart"];

    const { onPointerDown, isPressed } = usePointerDrag({
      onStart: onStart,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    expect(isPressed.value).toBe(false);
  });

  it("does not start dragging before threshold is passed", () => {
    const onMove = vi.fn();

    const { onPointerDown, isDragging } = usePointerDrag({
      threshold: 10,
      onMove,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointermove", {
        x: 5,
        y: 0,
        pointerId: 1,
        timeStamp: 10,
      }),
    );

    expect(isDragging.value).toBe(false);
    expect(onMove).not.toHaveBeenCalled();
  });

  it("starts dragging after threshold is passed", () => {
    const onMove = vi.fn();

    const { onPointerDown, isDragging } = usePointerDrag({
      threshold: 5,
      onMove,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointermove", {
        x: 10,
        y: 0,
        pointerId: 1,
        timeStamp: 10,
      }),
    );

    expect(isDragging.value).toBe(true);
    expect(onMove).toHaveBeenCalledOnce();
  });

  it("calls onEnd after active drag", () => {
    const onEnd = vi.fn();

    const { onPointerDown } = usePointerDrag({
      threshold: 0,
      onEnd,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointermove", {
        x: 10,
        y: 0,
        pointerId: 1,
        timeStamp: 10,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointerup", {
        x: 10,
        y: 0,
        pointerId: 1,
        timeStamp: 20,
      }),
    );

    expect(onEnd).toHaveBeenCalledOnce();
  });

  it("does not call onEnd if drag never became active", () => {
    const onEnd = vi.fn();

    const { onPointerDown } = usePointerDrag({
      threshold: 20,
      onEnd,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointerup", {
        x: 5,
        y: 0,
        pointerId: 1,
        timeStamp: 10,
      }),
    );

    expect(onEnd).not.toHaveBeenCalled();
  });

  it("cleans up state after pointerup", () => {
    const { onPointerDown, isPressed, isDragging } = usePointerDrag({
      threshold: 0,
    });

    onPointerDown(
      createPointerEvent("pointerdown", {
        x: 0,
        y: 0,
        target,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointermove", {
        x: 10,
        y: 0,
        pointerId: 1,
        timeStamp: 10,
      }),
    );

    window.dispatchEvent(
      createPointerEvent("pointerup", {
        x: 10,
        y: 0,
        pointerId: 1,
        timeStamp: 20,
      }),
    );

    expect(isPressed.value).toBe(false);
    expect(isDragging.value).toBe(false);
  });
});
