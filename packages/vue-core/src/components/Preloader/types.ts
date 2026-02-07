import type { CSSClassValue } from "../../types";

/**
 * Visual size preset of the preloader.
 *
 * Size presets define default spacing, spinner dimensions, and typography
 * via internal CSS variables.
 *
 * Built-in presets:
 * - `sm`
 * - `md` (default)
 * - `lg`
 *
 * Custom string values (e.g. `"xl"`, `"xxl"`) are supported and can be styled
 * using the `data-preloader-size` attribute.
 *
 * Note:
 * All size-related styles can be overridden via the `ui` prop, which takes
 * precedence over size presets.
 */
export type PreloaderSize =
  | "sm"
  | "md"
  | "lg"
  | string;

/**
 * Optional UI class overrides for Preloader sub-elements.
 *
 * This object allows consumers to inject additional classes
 * without replacing or breaking the internal structure.
 *
 * All fields are optional and applied additively.
 */
export type UI = {
  /**
   * Classes applied to the root preloader element.
   */
  root?: CSSClassValue;

  /**
   * Classes applied to the content wrapper.
   */
  content?: CSSClassValue;

  /**
   * Classes applied to the spinner container.
   */
  spinner?: CSSClassValue;

  /**
   * Classes applied to the message container.
   */
  message?: CSSClassValue;
};

/**
 * Props definition for the Preloader component.
 *
 * The Preloader is a presentational component that reflects
 * an external loading state. It does not emit any events
 * and does not manage async logic internally.
 */
export type PreloaderProps = {
  /**
   * Optional UI class overrides for internal elements.
   */
  ui?: UI;

  /**
   * Size variant of the preloader.
   *
   * Defaults to `md`.
   */
  size?: PreloaderSize;

  /**
   * Controls whether the preloader should be displayed.
   *
   * This value is stabilized internally to prevent UI flicker.
   */
  visible?: boolean;

  /**
   * Whether the spinner should be rendered.
   *
   * Useful prevents rendering the spinner when a custom
   * content slot is provided.
   */
  spinner?: boolean;

  /**
   * Delay in milliseconds before the preloader becomes visible.
   *
   * Used to avoid showing the preloader for very short operations.
   */
  delay?: number;

  /**
   * Minimum duration in milliseconds that the preloader
   * remains visible once shown.
   */
  minVisible?: number;

  /**
   * Enables or disables the backdrop overlay.
   *
   * When enabled, pointer events are blocked for the underlying content.
   */
  backdrop?: boolean;

  /**
   * Optional message displayed acknowledging the loading state.
   *
   * Can be overridden via the `message` slot.
   */
  message?: string;
};

/**
 * Slots exposed by the Preloader component.
 *
 * Slots allow customizing individual parts of the preloader
 * while preserving the default layout and behavior.
 */
export type PreloaderSlots = {
  /**
   * Slot for customizing the spinner.
   *
   * Receives the resolved preloader size.
   */
  spinner: (props: { size: PreloaderSize }) => void;

  /**
   * Slot for customizing the loading message.
   */
  message: () => void;

  /**
   * Slot for replacing the entire preloader content.
   *
   * Receives the resolved size and message value.
   */
  content: (props: { size: PreloaderSize; message: string | undefined }) => void;
};
