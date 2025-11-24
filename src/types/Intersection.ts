import { SetLike } from './SetLike'

/**
 * Creates the intersection of two sets A ∩ B
 *
 * **Mathematical Definition:** A ∩ B = {x | x ∈ A and x ∈ B}
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c', 'd'];
 * type Result = Intersection<SetA, SetB>; // Elements that are in both sets
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b' | 'c'>;
 * type SetY = Set<'b' | 'c' | 'd'>;
 * type ResultSet = Intersection<SetX, SetY>; // Set<'b' | 'c'>
 * ```
 */
export type Intersection<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<Extract<TA, TB>>
      : B extends readonly (infer TB)[]
        ? Set<Extract<TA, TB>>
        : never
    : A extends readonly unknown[]
      ? B extends Set<infer TB>
        ? { readonly [K in keyof A]: A[K] extends TB ? A[K] : never }[number][]
        : B extends readonly unknown[]
          ? {
              readonly [K in keyof A]: A[K] extends B[number] ? A[K] : never
            }[number][]
          : never
      : never
