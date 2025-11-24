import { SetLike } from './SetLike'

/**
 * Checks if a set is empty (∅)
 *
 * **Mathematical Definition:** A set is empty if |A| = 0
 *
 * @template T Set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type EmptySet = readonly [];
 * type NonEmptySet = readonly ['a'];
 * type IsEmptyResult1 = IsEmpty<EmptySet>; // true
 * type IsEmptyResult2 = IsEmpty<NonEmptySet>; // false
 *
 * // With Set objects
 * type EmptySetObj = Set<never>;
 * type NonEmptySetObj = Set<'a'>;
 * type IsEmptyResult3 = IsEmpty<EmptySetObj>; // true
 * type IsEmptyResult4 = IsEmpty<NonEmptySetObj>; // false
 * ```
 */
export type IsEmpty<T extends SetLike<unknown>> =
  T extends Set<infer E>
    ? E extends never
      ? true
      : false
    : T extends readonly []
      ? true
      : false
