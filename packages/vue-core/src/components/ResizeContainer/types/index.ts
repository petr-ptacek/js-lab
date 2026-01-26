import type { CSSClassValue } from "../../../types";

export type SizeValueUnit = `${number}%` | `${number}px`;

export type SizeValue = number | SizeValueUnit;

export type OriginValue = "alpha" | "beta";

export type OrientationValue = "horizontal" | "vertical";

export type UiResizeContainerModalValue = SizeValue;

export type UI = {
  root?: CSSClassValue;
  content?: CSSClassValue;
  section?: CSSClassValue;
  sectionAlpha?: CSSClassValue;
  sectionBeta?: CSSClassValue;
  divider?: CSSClassValue;
  resizeHandler?: CSSClassValue;
}

export type UiResizeContainerProps = {
  /**
   * Size of the origin section.
   * Can be defined in px or %.
   * Internally normalized to percentage relative to container.
   * Emitted value is always percentage.
   */
  modelValue?: UiResizeContainerModalValue;

  defaultValue?: UiResizeContainerModalValue;

  ui?: UI;

  orientation?: OrientationValue;
  origin?: OriginValue;

  showGrip?: boolean;

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

export type UiResizeContainerSlots = {
  alpha: () => void;
  beta: () => void;
}

export type UiResizeContainerEmits = {
  "update:modelValue": [UiResizeContainerModalValue]
}

export type UiResizeContainerExpose = {
  expand: () => void;
  collapse: () => void;
}
