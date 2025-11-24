import { SetLike } from './SetLike'

/**
 * Checks if set A is a subset of set B (A ⊆ B)
 *
 * **Mathematical Definition:** A ⊆ B if ∀x (x ∈ A → x ∈ B)
 *
 * @template A Potential subset
 * @template B Potential superset
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['a', 'b', 'c'];
 * type Result = Subset<SetA, SetB>; // true
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<'a' | 'b' | 'c'>;
 * type ResultSet = Subset<SetX, SetY>; // true
 * ```
 */
export type Subset<A extends SetLike<T>, B extends SetLike<T>, T = unknown> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? TA extends TB
        ? true
        : false
      : B extends readonly (infer TB)[]
        ? TA extends TB
          ? true
          : false
        : false
    : A extends readonly unknown[]
      ? B extends Set<infer TB>
        ? A[number] extends TB
          ? true
          : false
        : B extends readonly unknown[]
          ? A[number] extends B[number]
            ? true
            : false
          : false
      : false
