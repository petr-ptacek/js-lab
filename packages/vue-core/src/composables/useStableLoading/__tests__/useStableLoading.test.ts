import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { ref }                                   from "vue";

import { describeVue }      from "@petr-ptacek/vue-test-utils";
import { useStableLoading } from "../useStableLoading";

describeVue("useStableLoading – short loading", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not show loading for short operations", () => {
    const source = ref(false);
    const { loading } = useStableLoading(source, {
      delay: 250,
      minVisible: 300,
    });

    source.value = true;
    vi.advanceTimersByTime(100); // méně než delay

    source.value = false;
    vi.runAllTimers();

    expect(loading.value).toBe(false);
  });

  it("shows loading after delay", () => {
    const source = ref(false);
    const { loading } = useStableLoading(source, {
      delay: 250,
      minVisible: 300,
    });

    source.value = true;
    vi.advanceTimersByTime(250);

    expect(loading.value).toBe(true);
  });

  it("keeps loading visible for minimum duration", () => {
    const source = ref(false);
    const { loading } = useStableLoading(source, {
      delay: 250,
      minVisible: 300,
    });

    source.value = true;
    vi.advanceTimersByTime(250); // loader se objeví

    expect(loading.value).toBe(true);

    source.value = false;
    vi.advanceTimersByTime(100); // méně než minVisible

    expect(loading.value).toBe(true);

    vi.advanceTimersByTime(200); // doběhne minVisible

    expect(loading.value).toBe(false);
  });

  it("hides loading immediately if minVisible is already satisfied", () => {
    const source = ref(false);
    const { loading } = useStableLoading(source, {
      delay: 250,
      minVisible: 300,
    });

    source.value = true;
    vi.advanceTimersByTime(700); // delay + minVisible

    expect(loading.value).toBe(true);

    source.value = false;
    vi.runAllTimers();

    expect(loading.value).toBe(false);
  });
});
