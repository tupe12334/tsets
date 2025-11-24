import { SetLike } from './SetLike'

/**
 * Creates the Cartesian product A × B
 *
 * **Mathematical Definition:** A × B = {(a,b) | a ∈ A and b ∈ B}
 *
 * @template A First set type
 * @template B Second set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly [1, 2];
 * type Product = CartesianProduct<SetA, SetB>;
 * // Result: readonly [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<1 | 2>;
 * type ProductSet = CartesianProduct<SetX, SetY>;
 * // Result: Set<readonly ['a', 1] | readonly ['a', 2] | readonly ['b', 1] | readonly ['b', 2]>
 * ```
 */
export type CartesianProduct<
  A extends SetLike<unknown>,
  B extends SetLike<unknown>,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<readonly [TA, TB]>
      : B extends readonly (infer TB)[]
        ? Set<readonly [TA, TB]>
        : never
    : A extends readonly unknown[]
      ? B extends Set<infer TB>
        ? { readonly [I in keyof A]: readonly [A[I], TB] }[number]
        : B extends readonly unknown[]
          ? {
              readonly [I in keyof A]: {
                readonly [J in keyof B]: readonly [A[I], B[J]]
              }[number]
            }[number]
          : never
      : never
