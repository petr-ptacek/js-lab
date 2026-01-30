import { describe, it, expect } from "vitest";
import { shuffle }         from "../shuffle";

describe("shuffle", () => {
  it("does not mutate the original array", () => {
    const original = [1, 2, 3, 4];
    const copy = [...original];

    shuffle(original);

    expect(original).toEqual(copy);
  });

  it("returns an array with the same length", () => {
    const array = [1, 2, 3, 4, 5];

    const result = shuffle(array);

    expect(result).toHaveLength(array.length);
  });

  it("contains the same elements", () => {
    const array = [1, 2, 3, 4, 5];

    const result = shuffle(array);

    expect(result.slice().sort()).toEqual(array.slice().sort());
  });

  it("works with empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("works with single-element array", () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it("eventually changes the order (statistical test)", () => {
    const array = [1, 2, 3, 4, 5];
    let changed = false;

    for ( let i = 0; i < 20; i++ ) {
      const shuffled = shuffle(array);

      if ( !shuffled.every((value, index) => value === array[index]) ) {
        changed = true;
        break;
      }
    }

    expect(changed).toBe(true);
  });

  it("never adds or removes elements", () => {
    const array = [1, 2, 3];
    const result = shuffle(array);

    expect(result.filter(v => v === undefined)).toHaveLength(0);
  });

});
