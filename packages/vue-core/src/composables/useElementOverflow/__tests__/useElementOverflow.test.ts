import { describe, expect, it, vi } from "vitest";
import { nextTick, ref }        from "vue";

import { useElementOverflow } from "../useElementOverflow";

function createElement({
                         clientWidth,
                         clientHeight,
                         scrollWidth,
                         scrollHeight,
                       }: {
  clientWidth: number;
  clientHeight: number;
  scrollWidth: number;
  scrollHeight: number;
}): HTMLElement {
  const el = document.createElement("div");

  Object.defineProperties(el, {
    clientWidth: { value: clientWidth, configurable: true },
    clientHeight: { value: clientHeight, configurable: true },
    scrollWidth: { value: scrollWidth, configurable: true },
    scrollHeight: { value: scrollHeight, configurable: true },
  });

  return el;
}

async function flush() {
  await nextTick();
  vi.runAllTimers();
  await nextTick();
}

describe("useElementOverflow", () => {
  it("detects no overflow", async () => {
    const el = createElement({
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 100,
      scrollHeight: 100,
    });

    const target = ref<HTMLElement | null>(el);
    const overflow = useElementOverflow(target);

    await flush()

    expect(overflow.hasOverflow.value).toBe(false);
    expect(overflow.direction.value).toBe("none");
  });

  it("detects vertical overflow", async () => {
    const el = createElement({
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 100,
      scrollHeight: 200,
    });

    const target = ref<HTMLElement | null>(el);
    const overflow = useElementOverflow(target);

    await flush();

    expect(overflow.hasVertical.value).toBe(true);
    expect(overflow.hasHorizontal.value).toBe(false);
    expect(overflow.direction.value).toBe("vertical");
  });

  it("detects horizontal overflow", async () => {
    const el = createElement({
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 200,
      scrollHeight: 100,
    });

    const target = ref<HTMLElement | null>(el);
    const overflow = useElementOverflow(target);

    await flush();

    expect(overflow.hasHorizontal.value).toBe(true);
    expect(overflow.hasVertical.value).toBe(false);
    expect(overflow.direction.value).toBe("horizontal");
  });

  it("detects overflow in both directions", async () => {
    const el = createElement({
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 200,
      scrollHeight: 200,
    });

    const target = ref<HTMLElement | null>(el);
    const overflow = useElementOverflow(target);

    await flush();

    expect(overflow.hasOverflow.value).toBe(true);
    expect(overflow.direction.value).toBe("both");
  });

  it("resets overflow when disabled", async () => {
    const el = createElement({
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 200,
      scrollHeight: 200,
    });

    const target = ref<HTMLElement | null>(el);
    const disabled = ref(true);

    const overflow = useElementOverflow(target, { disabled });

    await flush();

    expect(overflow.hasOverflow.value).toBe(false);
    expect(overflow.direction.value).toBe("none");
  });

  it("allows manual update and reset", async () => {
    const el = createElement({
      clientWidth: 100,
      clientHeight: 100,
      scrollWidth: 200,
      scrollHeight: 200,
    });

    const target = ref<HTMLElement | null>(el);
    const overflow = useElementOverflow(target);

    overflow.update();
    await flush();

    expect(overflow.hasOverflow.value).toBe(true);

    overflow.reset();
    await flush();

    expect(overflow.hasOverflow.value).toBe(false);
  });
});
