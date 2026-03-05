export type IsFn<T> = (value: unknown) => value is T;

export interface DescribeIsOptions<T> {
  valid: readonly T[];
  invalid?: readonly unknown[];
  typeTest?: (value: T) => void;
}

export interface GuardTestCase<T> {
  fn: IsFn<T>;
  valid: readonly T[];
  invalid: readonly unknown[];
  typeTest?: (value: T) => void;
}
