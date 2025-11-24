import { SetLike } from './SetLike'
import { Subset } from './Subset'

/**
 * Checks if two sets are equal (A = B)
 *
 * **Mathematical Definition:** A = B if A ⊆ B and B ⊆ A
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['b', 'a'];
 * type Result = Equal<SetA, SetB>; // true (order doesn't matter in sets)
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<'b' | 'a'>;
 * type ResultSet = Equal<SetX, SetY>; // true
 * ```
 */
export type Equal<A extends SetLike<T>, B extends SetLike<T>, T = unknown> =
  Subset<A, B, T> extends true
    ? Subset<B, A, T> extends true
      ? true
      : false
    : false
