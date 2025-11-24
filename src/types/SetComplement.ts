import { Difference } from './Difference'
import { SetLike } from './SetLike'

/**
 * Creates the complement of set A with respect to universal set U
 *
 * **Mathematical Definition:** A^c = U \ A = {x | x ∈ U and x ∉ A}
 *
 * @template U Universal set type
 * @template A Set type to complement
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type Universe = readonly ['a', 'b', 'c', 'd'];
 * type SetA = readonly ['a', 'b'];
 * type Complement = SetComplement<Universe, SetA>; // readonly ['c', 'd']
 *
 * // With Set objects
 * type UniverseSet = Set<'a' | 'b' | 'c' | 'd'>;
 * type SetX = Set<'a' | 'b'>;
 * type ComplementSet = SetComplement<UniverseSet, SetX>; // Set<'c' | 'd'>
 * ```
 */
export type SetComplement<
  U extends SetLike<T>,
  A extends SetLike<T>,
  T = unknown,
> = Difference<U, A, T>
