import { type Ref } from "vue";

export type UsePointerDragOptions = {
  disabled?: Ref<boolean>;

  onStart?: (e: PointerEvent) => void;
  onMove?: (e: PointerEvent) => void;
  onEnd?: (e: PointerEvent) => void;
};

export type UsePointerDragReturn = {
  onPointerDown: (e: PointerEvent) => void;
  isDragging: Readonly<Ref<boolean>>;
}
