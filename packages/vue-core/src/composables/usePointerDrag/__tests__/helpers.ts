import { vi } from "vitest";

export function createPointerEvent(
  type: string,
  {
    x = 0,
    y = 0,
    pointerId = 1,
    timeStamp = 0,
    target,
  }: {
    x?: number;
    y?: number;
    pointerId?: number;
    timeStamp?: number;
    target?: HTMLElement;
  } = {},
) {
  const evt = new PointerEvent(type, {
    clientX: x,
    clientY: y,
    pointerId,
    bubbles: true,
  });

  Object.defineProperty(evt, "timeStamp", { value: timeStamp });
  Object.defineProperty(evt, "currentTarget", { value: target });

  return evt;
}

export function createTargetEl() {
  const el = document.createElement("div");

  el.setPointerCapture = vi.fn();
  el.releasePointerCapture = vi.fn();

  document.body.appendChild(el);
  return el;
}

