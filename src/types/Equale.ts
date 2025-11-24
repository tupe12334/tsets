import { Equal } from './Equal'
import { SetLike } from './SetLike'

/**
 * Enhanced equality check that works with complex types
 * This is an alias for Equal with better name for logical operations
 *
 * **Mathematical Definition:** A = B if A ⊆ B and B ⊆ A
 *
 * @template A First set type
 * @template B Second set type
 * @template T Element type (inferred)
 * @example
 * ```typescript
 * // With readonly arrays
 * type Test = Equale<readonly [1, 2], readonly [2, 1]>; // true
 *
 * // With Set objects
 * type TestSet = Equale<Set<1 | 2>, Set<2 | 1>>; // true
 * ```
 */
export type Equale<
  A extends SetLike<T>,
  B extends SetLike<T>,
  T = unknown,
> = Equal<A, B, T>
