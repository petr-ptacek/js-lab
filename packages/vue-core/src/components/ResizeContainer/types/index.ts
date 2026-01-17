export type SizeUnitType = "%" | "px";

export type SizeValueUnit = `${number}%` | `${number}px`;

export type SizeValue = number | SizeValueUnit;

export type OriginValue = "alpha" | "beta";

export type OrientationValue = "horizontal" | "vertical";

export type UiResizeContainerModalValue = SizeValue;

export type UiResizeContainerProps = {
  /**
   * Size of the origin section.
   * Can be defined in px or %.
   * Internally normalized to percentage relative to container.
   * Emitted value is always percentage.
   */
  modelValue?: UiResizeContainerModalValue;

  defaultValue?: UiResizeContainerModalValue;

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
