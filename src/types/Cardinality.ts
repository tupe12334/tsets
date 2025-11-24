import { SetLike } from './SetLike'

/**
 * Gets the cardinality (size) of a set |A|
 *
 * **Mathematical Definition:** |A| = number of elements in A
 *
 * Note: For Set types, this returns the union type size, not a numeric literal
 *
 * @template T Set type
 * @example
 * ```typescript
 * // With readonly arrays
 * type MySet = readonly ['a', 'b', 'c'];
 * type Size = Cardinality<MySet>; // 3
 *
 * // With Set objects - returns number (size known at runtime, not compile time)
 * type MySetObj = Set<'a' | 'b' | 'c'>;
 * type SizeObj = Cardinality<MySetObj>; // number
 * ```
 */
export type Cardinality<T extends SetLike<unknown>> =
  T extends Set<unknown>
    ? number
    : T extends readonly unknown[]
      ? T['length']
      : never
