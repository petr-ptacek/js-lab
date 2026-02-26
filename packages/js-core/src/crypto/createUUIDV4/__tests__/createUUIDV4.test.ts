import { describe, it, expect, vi, afterEach } from "vitest";
import { createUUIDV4 }                        from "../createUUIDV4";

describe("createUUIDV4", () => {
  const originalCrypto = globalThis.crypto;

  afterEach(() => {
    Object.defineProperty(globalThis, "crypto", {
      value: originalCrypto,
      configurable: true,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  it("returns a string", () => {
    const uuid = createUUIDV4();
    expect(typeof uuid).toBe("string");
  });

  it("returns UUID in correct RFC 4122 v4 format", () => {
    const uuid = createUUIDV4();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuid).toMatch(uuidRegex);
  });

  it("uses crypto.randomUUID when available", () => {
    const mock = vi.fn(() => "mocked-uuid");
    Object.defineProperty(globalThis, "crypto", {
      value: { randomUUID: mock },
      configurable: true,
    });

    const uuid = createUUIDV4();

    expect(mock).toHaveBeenCalledTimes(1);
    expect(uuid).toBe("mocked-uuid");
  });

  it("uses crypto.getRandomValues when randomUUID is not available", () => {
    const getRandomValuesMock = vi.fn((arr: Uint8Array) => {
      for ( let i = 0; i < arr.length; i++ ) {
        arr[i] = i;
      }
      return arr;
    });

    Object.defineProperty(globalThis, "crypto", {
      value: { getRandomValues: getRandomValuesMock },
      configurable: true,
    });

    const uuid = createUUIDV4();

    expect(getRandomValuesMock).toHaveBeenCalledTimes(1);

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuid).toMatch(uuidRegex);
  });

  it("falls back to Math.random when crypto is unavailable", () => {
    Object.defineProperty(globalThis, "crypto", {
      value: undefined,
      configurable: true,
    });

    const uuid = createUUIDV4();

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    expect(uuid).toMatch(uuidRegex);
  });

  it("generates many unique UUIDs without collision (statistical test)", () => {
    const uuids = new Set<string>();
    const count = 1000;

    for ( let i = 0; i < count; i++ ) {
      uuids.add(createUUIDV4());
    }

    expect(uuids.size).toBe(count);
  });
});
