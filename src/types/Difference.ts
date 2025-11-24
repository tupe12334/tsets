import { SetLike } from './SetLike'

/**
 * Creates the difference of two sets A \ B (also written A - B)
 *
 * **Mathematical Definition:** A \ B = {x | x ∈ A and x ∉ B}
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b', 'c'];
 * type SetB = readonly ['b', 'c'];
 * type Result = Difference<SetA, SetB>; // readonly ['a']
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b' | 'c'>;
 * type SetY = Set<'b' | 'c'>;
 * type ResultSet = Difference<SetX, SetY>; // Set<'a'>
 * ```
 */
export type Difference<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<Exclude<TA, TB>>
      : B extends readonly (infer TB)[]
        ? Set<Exclude<TA, TB>>
        : never
    : A extends readonly unknown[]
      ? B extends Set<infer TB>
        ? { readonly [K in keyof A]: A[K] extends TB ? never : A[K] }[number][]
        : B extends readonly unknown[]
          ? {
              readonly [K in keyof A]: A[K] extends B[number] ? never : A[K]
            }[number][]
          : never
      : never
