/**
 * Represents the empty set ∅ (null set)
 *
 * **Mathematical Definition:** ∅ = {} (the set with no elements)
 *
 * @example
 * ```typescript
 * type Empty = EmptySet; // readonly []
 * type IsEmpty = IsEmpty<EmptySet>; // true
 * ```
 */
export type EmptySet = readonly []
