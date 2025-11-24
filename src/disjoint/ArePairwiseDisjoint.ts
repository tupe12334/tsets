import { IsDisjoint, SetLike } from '../types'

/**
 * Checks if all sets in a record are pairwise disjoint
 *
 * **Mathematical Definition:** Sets A₁, A₂, ..., Aₙ are pairwise disjoint
 * if Aᵢ ∩ Aⱼ = ∅ for all i ≠ j
 *
 * @template T Record of sets
 * @example
 * ```typescript
 * type DisjointSets = {
 *   a: readonly ['x', 'y'];
 *   b: readonly ['z', 'w'];
 * };
 * type AreDisjoint = ArePairwiseDisjoint<DisjointSets>; // true
 * ```
 */
export type ArePairwiseDisjoint<T extends Record<string, SetLike<unknown>>> = {
  [K1 in keyof T]: {
    [K2 in keyof T]: K1 extends K2 ? true : IsDisjoint<T[K1], T[K2]>
  }[keyof T]
}[keyof T] extends true
  ? true
  : false
