import { SetLike } from './SetLike'

/**
 * Creates the power set 𝒫(A) (set of all subsets)
 *
 * **Mathematical Definition:** 𝒫(A) = {S | S ⊆ A}
 *
 * Note: This is a complex type operation with limitations in TypeScript.
 * For practical use, this type represents the concept but may require
 * runtime implementation for actual computation.
 *
 * @template T Set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type MySet = readonly ['a', 'b'];
 * type Power = PowerSet<MySet>;
 * // Represents all possible subsets conceptually
 *
 * // With Set objects
 * type MySetObj = Set<'a' | 'b'>;
 * type PowerObj = PowerSet<MySetObj>;
 * // Set<Set<'a' | 'b'>>
 * ```
 */
export type PowerSet<T extends SetLike<unknown>> =
  T extends Set<infer E>
    ? Set<Set<E>>
    : T extends readonly unknown[]
      ? readonly (readonly T[number][])[]
      : never
