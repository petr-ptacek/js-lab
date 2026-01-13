import { type MaybeRef, type Ref } from "vue";

/********************
 PUBLIC TYPES
 ********************/

export type UsePointerDragOptions = {
  disabled?: MaybeRef<boolean>;
  axis?: MaybeRef<DragAxis>;
  threshold?: MaybeRef<number>;

  /**
   * možnost obrátit směr delty na určité ose
   */
  invertAxis?: MaybeRef<DragAxis | boolean>;

  /**
   * automatické zamčení osy pohybu poté, co uživatel jasně naznačí směr dragu
   * */
  lockAxisAfterThreshold?: MaybeRef<boolean>;

  onStart?: (e: EventData) => (void | false);
  onMove?: (e: EventData) => void;
  onEnd?: (e: EventData) => void;
};

export type UsePointerDragReturn = {
  onPointerDown: (e: PointerEvent) => void;
  isDragging: Readonly<Ref<boolean>>;
  isPressed: Readonly<Ref<boolean>>;

  axis: Readonly<Ref<DragAxis>>;
  invertAxis: Readonly<Ref<DragAxis | null>>;
  direction: Readonly<Ref<DragDirection>>;
  startX: Readonly<Ref<number>>;
  startY: Readonly<Ref<number>>;
  deltaX: Readonly<Ref<number>>;
  deltaY: Readonly<Ref<number>>;
  velocityX: Readonly<Ref<number>>;
  velocityY: Readonly<Ref<number>>;
}

/*******************
 INTERNAL TYPES
 ********************/

export type DragAxis = "x" | "y" | "both";

export type DragDirection = "left" | "right" | "top" | "bottom" | null;

export type EventData = {
  evt: PointerEvent;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  velocityX: number;
  velocityY: number;
}
