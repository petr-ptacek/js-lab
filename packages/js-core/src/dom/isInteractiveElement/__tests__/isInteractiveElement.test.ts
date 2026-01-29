import { describe, it, expect } from "vitest";
import {
  isInteractiveElement,
  DEFAULT_INTERACTIVE_SELECTORS,
} from "../isInteractiveElement";

describe("isInteractiveElement", () => {
  it("returns false for null element", () => {
    expect(isInteractiveElement(null)).toBe(false);
  });

  it("detects direct interactive element", () => {
    const button = document.createElement("button");

    expect(isInteractiveElement(button)).toBe(true);
  });

  it("detects nested interactive element via closest()", () => {
    const button = document.createElement("button");
    const span = document.createElement("span");

    button.appendChild(span);

    expect(isInteractiveElement(span)).toBe(true);
  });

  it("returns false for non-interactive element", () => {
    const div = document.createElement("div");

    expect(isInteractiveElement(div)).toBe(false);
  });

  it("detects contenteditable element", () => {
    const div = document.createElement("div");
    div.setAttribute("contenteditable", "true");

    expect(isInteractiveElement(div)).toBe(true);
  });

  it("respects custom selectors only", () => {
    const div = document.createElement("div");
    div.className = "clickable";

    expect(
      isInteractiveElement(div, {
        selectors: [".clickable"],
      }),
    ).toBe(true);
  });

  it("does not use defaults when custom selectors are provided", () => {
    const button = document.createElement("button");

    expect(
      isInteractiveElement(button, {
        selectors: [".custom"],
      }),
    ).toBe(false);
  });

  it("returns false when selectors array is empty", () => {
    const button = document.createElement("button");

    expect(
      isInteractiveElement(button, {
        selectors: [],
      }),
    ).toBe(false);
  });

  it("works with DEFAULT_INTERACTIVE_SELECTORS explicitly", () => {
    const input = document.createElement("input");

    expect(
      isInteractiveElement(input, {
        selectors: DEFAULT_INTERACTIVE_SELECTORS,
      }),
    ).toBe(true);
  });

  it("supports extending DEFAULT_INTERACTIVE_SELECTORS", () => {
    const div = document.createElement("div");
    div.setAttribute("role", "button");

    expect(
      isInteractiveElement(div, {
        selectors: [
          ...DEFAULT_INTERACTIVE_SELECTORS,
          "[role='button']",
        ],
      }),
    ).toBe(true);
  });
});
