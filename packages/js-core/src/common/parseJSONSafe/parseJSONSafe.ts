import { withTryCatchSync } from "../withTryCatch";

export function parseJSONSafe<T>(value: string, fallback?: T | undefined): T | undefined {
  const result = withTryCatchSync<T | undefined>(
    () => {
      return JSON.parse(value) as T;
    },
    {
      fallback,
    },
  );

  return result.data;
}
