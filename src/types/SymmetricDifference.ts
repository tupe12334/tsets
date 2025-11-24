import { Difference } from './Difference'
import { SetLike } from './SetLike'
import { Union } from './Union'

/**
 * Creates the symmetric difference A △ B (also written A ⊕ B)
 *
 * **Mathematical Definition:** A △ B = (A \ B) ∪ (B \ A) = (A ∪ B) \ (A ∩ B)
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c', 'd'];
 * type Result = SymmetricDifference<SetA, SetB>; // Elements in either A or B, but not both
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b' | 'c'>;
 * type SetY = Set<'b' | 'c' | 'd'>;
 * type ResultSet = SymmetricDifference<SetX, SetY>; // Set<'a' | 'd'>
 * ```
 */
export type SymmetricDifference<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> = Union<Difference<A, B, T>, Difference<B, A, T>>
