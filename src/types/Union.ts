import { SetLike } from './SetLike'

/**
 * Creates the union of two sets A ∪ B
 *
 * **Mathematical Definition:** A ∪ B = {x | x ∈ A or x ∈ B}
 *
 * @template A First set type
 * @template B Second set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['c', 'd'];
 * type Result = Union<SetA, SetB>; // readonly ["a", "b", "c", "d"]
 *
 * // With Set objects
 * type SetX = Set<'x' | 'y'>;
 * type SetZ = Set<'z' | 'w'>;
 * type ResultSet = Union<SetX, SetZ>; // Set<'x' | 'y' | 'z' | 'w'>
 * ```
 */
export type Union<A extends SetLike<unknown>, B extends SetLike<unknown>> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Set<TA | TB>
      : B extends readonly (infer TB)[]
        ? Set<TA | TB>
        : never
    : A extends readonly unknown[]
      ? B extends Set<infer TB>
        ? readonly [...A, ...(readonly TB[])]
        : B extends readonly unknown[]
          ? readonly [...A, ...B]
          : never
      : never
