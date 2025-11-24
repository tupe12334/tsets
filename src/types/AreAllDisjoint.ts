import { IsDisjoint } from './IsDisjoint'
import { SetLike } from './SetLike'

/**
 * Checks if multiple sets (variadic) are all pairwise disjoint
 *
 * **Mathematical Definition:** For sets S₁, S₂, ..., Sₙ, they are pairwise disjoint
 * if for all i ≠ j: Sᵢ ∩ Sⱼ = ∅
 *
 * @template Sets Tuple of set types to check
 * @example
 * ```typescript
 * type Sets = [readonly [1, 2], readonly ['a', 'b'], readonly [true, false]];
 * type AllDisjoint = AreAllDisjoint<Sets>; // true
 * ```
 */
export type AreAllDisjoint<Sets extends readonly SetLike<unknown>[]> =
  Sets extends readonly []
    ? true
    : Sets extends readonly [infer Head]
      ? Head extends SetLike<unknown>
        ? true
        : false
      : Sets extends readonly [infer Head, ...infer Tail]
        ? Head extends SetLike<unknown>
          ? Tail extends readonly SetLike<unknown>[]
            ? AllDisjointFrom<Head, Tail> extends true
              ? AreAllDisjoint<Tail>
              : false
            : false
          : false
        : false

/**
 * Helper type: checks if a set is disjoint from all sets in a tuple
 * @internal
 */
type AllDisjointFrom<
  Set extends SetLike<unknown>,
  Others extends readonly SetLike<unknown>[],
> = Others extends readonly []
  ? true
  : Others extends readonly [infer Head, ...infer Tail]
    ? Head extends SetLike<unknown>
      ? Tail extends readonly SetLike<unknown>[]
        ? IsDisjoint<Set, Head> extends true
          ? AllDisjointFrom<Set, Tail>
          : false
        : false
      : false
    : false
