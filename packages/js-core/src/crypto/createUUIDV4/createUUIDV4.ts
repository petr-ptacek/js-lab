/**
 * Generates an RFC 4122 version 4 UUID string.
 *
 * The function attempts to use cryptographically secure native APIs:
 * - `crypto.randomUUID()` if available
 * - `crypto.getRandomValues()` with manual RFC 4122 v4 bit masking
 *
 * If neither API is available, it falls back to `Math.random()`.
 * In that case, the result is not cryptographically secure and
 * MUST NOT be used for security-sensitive identifiers (e.g. tokens).
 *
 * The implementation is runtime-safe (uses `globalThis.crypto`)
 * and works in both browser and Node environments when supported.
 *
 * @returns A UUID v4 string in the format `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.
 *
 * @since 1.0.0
 *
 * @example
 * createUUIDV4();
 * // → "550e8400-e29b-41d4-a716-446655440000"
 *
 * @example
 * const id = createUUIDV4();
 * console.log(id);
 * // → "3f4c8e2a-9b1d-4f6e-8a3b-2c5d7e9f1a4b"
 */
export function createUUIDV4(): string {
  const cryptoObj = globalThis.crypto;

  if ( cryptoObj?.randomUUID ) {
    return cryptoObj.randomUUID();
  }

  if ( cryptoObj?.getRandomValues ) {
    const bytes = new Uint8Array(16);
    cryptoObj.getRandomValues(bytes);

    // RFC 4122 v4
    bytes[6] = (bytes[6]! & 0x0f) | 0x40;
    bytes[8] = (bytes[8]! & 0x3f) | 0x80;

    const hex = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");

    return (
      hex.slice(0, 8) + "-" +
      hex.slice(8, 12) + "-" +
      hex.slice(12, 16) + "-" +
      hex.slice(16, 20) + "-" +
      hex.slice(20)
    );
  }

  // last-resort fallback (NOT cryptographically secure)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
