// eslint-disable-next-line no-undef
export type Selector = keyof HTMLElementTagNameMap | string;

export type InteractiveElementOptions = {
  selectors?: readonly Selector[];
}
