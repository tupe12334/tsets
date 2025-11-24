import { Intersection } from './Intersection'
import { SetLike } from './SetLike'

/**
 * Checks if two sets are disjoint (have no elements in common)
 *
 * **Mathematical Definition:** Sets A and B are disjoint if A ∩ B = ∅
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type SetA = readonly ['a', 'b'];
 * type SetB = readonly ['c', 'd'];
 * type Result = IsDisjoint<SetA, SetB>; // true
 *
 * // With Set objects
 * type SetX = Set<'a' | 'b'>;
 * type SetY = Set<'c' | 'd'>;
 * type ResultSet = IsDisjoint<SetX, SetY>; // true
 * ```
 */
export type IsDisjoint<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> =
  A extends Set<infer TA>
    ? B extends Set<infer TB>
      ? Extract<TA, TB> extends never
        ? true
        : false
      : B extends readonly (infer TB)[]
        ? Extract<TA, TB> extends never
          ? true
          : false
        : false
    : A extends readonly unknown[]
      ? B extends Set<unknown>
        ? Intersection<A, B, T> extends readonly never[]
          ? true
          : false
        : B extends readonly unknown[]
          ? Intersection<A, B, T> extends readonly never[]
            ? true
            : false
          : false
      : false
