import { useTemplateRef } from "vue";

import type { UseControllerOptions, Expose } from "../types";

export function useScrollable(options: UseControllerOptions) {
  const { props } = options;

  /***************************************
   Template HTMLElements Refs
   ***************************************/

  const contentWrapper = useTemplateRef<HTMLElement | null>("contentWrapper");
  const contentOverlay = useTemplateRef<HTMLElement | null>("contentOverlay");
  const contentScroll = useTemplateRef<HTMLElement | null>("contentScroll");
  const content = useTemplateRef<HTMLElement | null>("content");

  /****************************************
   * Logic
   ****************************************/
  function getScrollEl(): HTMLElement | null {
    return props.scrollable ? contentScroll.value : null;
  }

  const scrollTo: Expose["scrollTo"] = (options) => {
    const el = getScrollEl();

    if (!el) return false;
    el.scrollTo(options);

    return true;
  };

  const scrollToTop: Expose["scrollToTop"] = (options) => {
    return scrollTo({
      ...options,
      top: 0,
    });
  };

  const scrollToBottom: Expose["scrollToBottom"] = (options) => {
    const el = getScrollEl();

    if (!el) return false;

    el.scrollTo({
      ...options,
      top: Math.max(0, el.scrollHeight - el.clientHeight),
    });

    return true;
  };

  return {
    contentWrapper,
    contentOverlay,
    contentScroll,
    content,
    scrollTo,
    scrollToTop,
    scrollToBottom,
  };
}
