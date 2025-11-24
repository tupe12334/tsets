import { And } from './And'
import { Implies } from './Implies'

/**
 * Logical biconditional (if and only if) operation
 *
 * **Mathematical Definition:** A ↔ B is true if A and B have the same truth value
 *
 * @template A First boolean type
 * @template B Second boolean type
 * @example
 * ```typescript
 * type Result1 = Iff<true, true>;   // true
 * type Result2 = Iff<true, false>;  // false
 * type Result3 = Iff<false, true>;  // false
 * type Result4 = Iff<false, false>; // true
 * ```
 */
export type Iff<A extends boolean, B extends boolean> = And<
  Implies<A, B>,
  Implies<B, A>
>
