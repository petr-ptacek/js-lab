import type { UsePointerDragReturn } from "../../../composables";
import type { CSSClassValue }        from "../../../types";

export type SizeValueUnit = `${number}%` | `${number}px`;

export type SizeValue = number | SizeValueUnit;

export type OriginValue = "alpha" | "beta";

export type OrientationValue = "horizontal" | "vertical";


export type UI = {
  root?: CSSClassValue;
  content?: CSSClassValue;
  section?: CSSClassValue;
  sectionAlpha?: CSSClassValue;
  sectionBeta?: CSSClassValue;
  divider?: CSSClassValue;
  actionsWrapper?: CSSClassValue;
  actions?: CSSClassValue;
  gripWrapper?: CSSClassValue;
  grip?: CSSClassValue;
  resizeHandler?: CSSClassValue;
}

/** =============================================================
 * PUBLIC API
 * ============================================================== */

export type ModelValue = SizeValue;

export type Props = {
  /**
   * Size of the origin section.
   * Can be defined in px or %.
   * Internally normalized to percentage relative to container.
   * Emitted value is always percentage.
   */
  modelValue?: ModelValue;

  defaultValue?: ModelValue;

  ui?: UI;

  orientation?: OrientationValue;
  origin?: OriginValue;

  showGrip?: boolean;

  showActions?: boolean;

  rememberSize?: boolean;

  /**
   * to the origin
   **/
  minSize?: SizeValue;

  /**
   * to the origin
   */
  maxSize?: SizeValue;

  /**
   * to the origin
   * */
  collapsible?: boolean;

  /**
   * to the origin
   */
  expandable?: boolean;

  /**
   * if expand and collapse are animatable
   */
  animatable?: boolean;

  /**
   * if resize action is enabled/disabled
   */
  resizeable?: boolean;
};

export type Slots = {
  alpha: () => void;
  beta: () => void;
  actions: (
    props: {
      ui: CSSClassValue,
      expand: () => void;
      collapse: () => void;
      isCollapsed: boolean;
      isExpanded: boolean;
    },
  ) => void;
  grip: (
    props: {
      onPointerDown: UsePointerDragReturn["onPointerDown"]
      ui: CSSClassValue,
    },
  ) => void;
}

export type Emits = {
  (e: "update:modelValue", payload: ModelValue): void;
}

export type Expose = {
  expand: () => void;
  collapse: () => void;
}
