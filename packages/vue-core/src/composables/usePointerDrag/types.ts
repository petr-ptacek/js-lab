import { type MaybeRef, type Ref } from "vue";

/********************
 PUBLIC TYPES
 ********************/
export type UsePointerDragOptions = {
  /**
   * Zakáže pointer drag interakci.
   * Pokud je `true`, `onPointerDown` nic neprovede.
   */
  disabled?: MaybeRef<boolean>;

  /**
   * Osa, po které se drag vyhodnocuje.
   *
   * - `"x"`   → pouze horizontální pohyb
   * - `"y"`   → pouze vertikální pohyb
   * - `"both"` (default) → volný pohyb
   */
  axis?: MaybeRef<DragAxis>;

  /**
   * Minimální vzdálenost (v pixelech), kterou se musí pointer pohnout,
   * než začne být drag považován za aktivní.
   *
   * Slouží k ignorování nechtěných mikropohybů.
   */
  threshold?: MaybeRef<number>;

  /**
   * Obrátí směr výsledné delty na zvolené ose.
   *
   * Používá se typicky pro resize zleva nebo shora.
   *
   * - `"x"`    → invertuje `deltaX`
   * - `"y"`    → invertuje `deltaY`
   * - `"both"` → invertuje obě osy
   * - `true`   → alias pro `"both"`
   */
  invertAxis?: MaybeRef<DragAxis | boolean>;

  /**
   * Po překročení thresholdu automaticky zamkne osu,
   * ve které je pohyb výraznější.
   *
   * Zvyšuje stabilitu a předvídatelnost dragu.
   * Aktivní pouze při `axis: "both"`.
   */
  lockAxisAfterThreshold?: MaybeRef<boolean>;

  /**
   * Callback vyvolaný při `pointerdown`,
   * pokud drag není zakázán.
   *
   * Vrácení `false` zabrání zahájení dragu.
   */
  onStart?: (e: EventData) => void | false;

  /**
   * Callback vyvolaný při každém pohybu pointeru
   * během aktivního dragu.
   */
  onMove?: (e: EventData) => void;

  /**
   * Callback vyvolaný při ukončení dragu
   * (`pointerup` nebo `lostpointercapture`).
   */
  onEnd?: (e: EventData) => void;
};

export type UsePointerDragReturn = {
  /**
   * Handler, který musí být připojen na `pointerdown`
   * elementu, jenž má reagovat na drag.
   */
  onPointerDown: (e: PointerEvent) => void;

  /**
   * Indikuje, že je drag aktuálně aktivní
   * (po `pointerdown` a před `pointerup`).
   */
  isDragging: Readonly<Ref<boolean>>;

  /**
   * Indikuje, že je pointer stisknutý,
   * i pokud ještě nebyl překročen threshold.
   */
  isPressed: Readonly<Ref<boolean>>;

  /**
   * Požadovaná osa dragu dle konfigurace.
   * Nemusí odpovídat skutečně zamčené ose.
   */
  axis: Readonly<Ref<DragAxis>>;

  /**
   * Osa, na které je aplikována inverze delty,
   * nebo `null`, pokud není žádná inverze aktivní.
   */
  invertAxis: Readonly<Ref<DragAxis | null>>;

  /**
   * Aktuální směr dragu odvozený z pohybu pointeru.
   * Slouží pro UI logiku (např. resize handle).
   */
  direction: Readonly<Ref<DragDirection>>;

  /**
   * Souřadnice pointeru v okamžiku zahájení dragu.
   */
  startX: Readonly<Ref<number>>;
  startY: Readonly<Ref<number>>;

  /**
   * Aktuální posun pointeru od začátku dragu,
   * již upravený podle osy, thresholdu a inverze.
   */
  deltaX: Readonly<Ref<number>>;
  deltaY: Readonly<Ref<number>>;

  /**
   * Okamžitá rychlost pohybu pointeru
   * v pixelech za milisekundu.
   */
  velocityX: Readonly<Ref<number>>;
  velocityY: Readonly<Ref<number>>;
};

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
