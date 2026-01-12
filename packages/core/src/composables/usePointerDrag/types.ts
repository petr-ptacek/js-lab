import { type MaybeRef, type Ref } from "vue";

/********************
 PUBLIC TYPES
 ********************/

export type UsePointerDragOptions = {
  disabled?: MaybeRef<boolean>;
  axis?: DragAxis;
  threshold?: number;

  /**
   * možnost obrátit směr delty na určité ose
   */
  invertAxis?: DragAxis | boolean;

  /**
   * automatické zamčení osy pohybu poté, co uživatel jasně naznačí směr dragu
   * */
  lockAxisAfterThreshold?: boolean;

  onStart?: (e: EventData) => (void | false);
  onMove?: (e: EventData) => void;
  onEnd?: (e: EventData) => void;
};

export type UsePointerDragReturn = {
  onPointerDown: (e: PointerEvent) => void;
  isDragging: Readonly<Ref<boolean>>;

  axis: Readonly<Ref<DragAxis>>;
  invertAxis: Readonly<Ref<DragAxis | null>>;
  startX: Readonly<Ref<number>>;
  startY: Readonly<Ref<number>>;
  deltaX: Readonly<Ref<number>>;
  deltaY: Readonly<Ref<number>>;
}

/*******************
 INTERNAL TYPES
 ********************/

export type DragAxis = "x" | "y" | "both";

export type EventData = {
  evt: PointerEvent;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
}
