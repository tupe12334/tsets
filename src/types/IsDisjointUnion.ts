import { IsDisjoint } from './IsDisjoint'
import { SetLike } from './SetLike'

/**
 * Checks if multiple sets are pairwise disjoint
 *
 * **Mathematical Definition:** Sets A₁, A₂, ..., Aₙ are pairwise disjoint
 * if Aᵢ ∩ Aⱼ = ∅ for all i ≠ j
 *
 * @template Sets Tuple of set types
 * @example
 * ```typescript
 * type Test1 = IsDisjointUnion<readonly [1, 2], readonly ['a', 'b'], readonly [true, false]>; // true
 * type Test2 = IsDisjointUnion<readonly [1, 2], readonly [2, 3], readonly [4, 5]>; // false
 * ```
 */
export type IsDisjointUnion<
  A extends SetLike<unknown>,
  B extends SetLike<unknown>,
  C extends SetLike<unknown> = readonly never[],
> = C extends readonly never[]
  ? IsDisjoint<A, B>
  : IsDisjoint<A, B> extends true
    ? IsDisjoint<A, C> extends true
      ? IsDisjoint<B, C>
      : false
    : false
