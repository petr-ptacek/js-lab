import { assertPositiveFinite } from "../../_helpers_";

export function getAspectRatio(width: number, height: number): number {
  assertPositiveFinite("width", width);
  assertPositiveFinite("height", height);
  return width / height;
}
